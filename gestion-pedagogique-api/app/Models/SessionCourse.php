<?php

namespace App\Models;

use App\Exceptions\HttpException;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionCourse extends Model
{
    use HasFactory;

    public static float $MAX_HOURS = 4;

    protected $fillable = [
        'start_date',
        'end_date',
        'scheduled_course_id',
        'classroom_id',
        'school_year_id',
    ];

    /**
     * Check if the start_date and end_date are valid
     */
    public static function validateDate(string $start_date, string $end_date)
    {
        if ($start_date > $end_date) {
            throw new HttpException("The start date must be before the end date", 400);
        }

        if ($start_date < now()->toDateString()) {
            throw new HttpException("The start date must be after today", 400);
        }
    }


    /**
     * Check if the duration is valid use carbon
     */
    public static function validateDuration(string $start_date, string $end_date)
    {
        $start_date = now()->parse($start_date);
        $end_date = now()->parse($end_date);

        $duration = $start_date->floatDiffInRealHours($end_date);

        if ($duration > self::$MAX_HOURS) {
            throw new HttpException('Max session duration is ' . SessionCourse::$MAX_HOURS . ' hours', 400);
        }

        return true;
    }

    public static function checkProfessorBooking(string $professorCoures, string $start_date, string $end_date)
    {
        $professor = ScheduledCourse::find($professorCoures)->user;

        $session = SessionCourse::whereHas('scheduled_course', function ($query) use ($professor) {
            $query->where('user_id', $professor->id);
        })->where('start_date', '<', $end_date)
            ->where('end_date', '>', $start_date)
            ->first();

        if ($session) {
            $start_date = now()->parse($session->start_date)->format('H:i');
            $end_date = now()->parse($session->end_date)->format('H:i');
            throw new HttpException("The professor is already booked from $start_date to $end_date for this date", 400);
        }
    }

    public static function checkClassroomBooking($classroom_id, string $start_date, string $end_date)
    {
        $session = SessionCourse::where('classroom_id', $classroom_id)
            ->where('start_date', '<', $end_date)
            ->where('end_date', '>', $start_date)
            ->first();

        if ($session) {
            $start_date = now()->parse($session->start_date)->format('H:i');
            $end_date = now()->parse($session->end_date)->format('H:i');
            throw new HttpException("The classroom is already booked from $start_date to $end_date for this date", 400);
        }
    }

    public static function checkHoursOverflow(string $course, string $start_date, string $end_date)
    {
        $scheduledCourse = ScheduledCourse::find($course);

        $duration = now()->parse($start_date)->floatDiffInRealHours(now()->parse($end_date));

        if ($scheduledCourse->scheduled_hours + $duration > $scheduledCourse->total_hours) {
            throw new HttpException("The course cannot contain the duration of this session", 400);
        }
    }

    public static function roundDate($dateOrigine)
    {
        $carbonDate = Carbon::parse($dateOrigine);

        $minutes = $carbonDate->minute;

        if ($minutes < 15) {
            $carbonDate->minute(0)->second(0);
        } elseif ($minutes < 30) {
            $carbonDate->minute(30)->second(0);
        } elseif ($minutes < 45) {
            $carbonDate->minute(30)->second(0);
        } else {
            $carbonDate->addHour()->minute(0)->second(0);
        }

        return $carbonDate->toDateTimeString();
    }

    // Relationships
    public function scheduled_course()
    {
        return $this->belongsTo(ScheduledCourse::class, 'scheduled_course_id', 'id', 'scheduled_courses');
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function school_year()
    {
        return $this->belongsTo(SchoolYear::class);
    }

    // Events
    public static function boot()
    {
        parent::boot();

        self::created(function ($model) {
            $scheduledCourse = ScheduledCourse::find($model->scheduled_course_id);

            $duration = now()->parse($model->start_date)->floatDiffInRealHours(now()->parse($model->end_date));

            $scheduledCourse->update([
                'scheduled_hours' => $scheduledCourse->scheduled_hours + $duration
            ]);
        });
    }
}
