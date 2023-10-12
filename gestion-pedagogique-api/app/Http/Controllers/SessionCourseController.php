<?php

namespace App\Http\Controllers;

use App\Exceptions\HttpException;
use App\Models\SessionCourse;
use App\Http\Requests\StoreSessionCourseRequest;
use App\Http\Requests\UpdateSessionCourseRequest;
use App\Http\Resources\SessionCourseResource;
use App\Models\ScheduledCourse;
use App\Models\SchoolYear;
use App\Traits\AppPermissionTrait;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Log;

class SessionCourseController extends Controller
{
    use AppPermissionTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $role = $user->roles()->first()->name;

        $sessionCoursesQuery = SessionCourse::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('school_year')) {
            $sessionCoursesQuery->where('school_year_id', request()->query('school_year'));
        }

        if (request()->has('classroom')) {
            $sessionCoursesQuery->where('classroom_id', request()->query('classroom'));
        }

        if (request()->has('canceled')) {
            $sessionCoursesQuery->where('canceled', request()->query('canceled'));
        }

        if (request()->has('start_date')) {
            $sessionCoursesQuery->where('start_date', '>=', request()->query('start_date'));
        }

        if (request()->has('end_date')) {
            $sessionCoursesQuery->where('end_date', '<=', request()->query('end_date'));
        }

        if ($role == $this::$ROLES['RP'] || $role == $this::$ROLES['ADMIN']) {
            if (request()->has('scheduled_course')) {
                $sessionCoursesQuery->where('scheduled_course_id', request()->query('scheduled_course'));
            }

            if ($limit === 'all') {
                return SessionCourseResource::collection($sessionCoursesQuery->get());
            }

            $sessionCourses = $sessionCoursesQuery->paginate($limit);

            return SessionCourseResource::collection($sessionCourses);
        }

        if ($role == $this::$ROLES['PROFESSOR']) {
            $sessionCoursesQuery->whereHas('scheduled_course', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            });

            if ($limit === 'all') {
                return SessionCourseResource::collection($sessionCoursesQuery->get());
            }

            $sessionCourses = $sessionCoursesQuery->paginate($limit);

            return SessionCourseResource::collection($sessionCourses);
        }

        throw new HttpException('You are not allowed to see this resource !', 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSessionCourseRequest $request)
    {
        $data = $request->validated();

        $start_date = SessionCourse::roundDate($data['start_date']);
        $end_date = SessionCourse::roundDate($data['end_date']);

        SessionCourse::validateDate($start_date, $end_date);

        SessionCourse::validateDuration($start_date, $end_date);

        SessionCourse::checkProfessorBooking($data['scheduled_course_id'], $start_date, $end_date);

        SessionCourse::checkClassroomBooking($data['classroom_id'], $start_date, $end_date);

        SessionCourse::checkHoursOverflow($data['scheduled_course_id'], $start_date, $end_date);

        $data['start_date'] = $start_date;

        $data['end_date'] = $end_date;

        return new SessionCourseResource(SessionCourse::create($data));
    }

    /**
     * Display the specified resource.
     */
    public function show(SessionCourse $sessionCourse)
    {
        return new SessionCourseResource($sessionCourse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSessionCourseRequest $request, SessionCourse $sessionCourse)
    {
        $sessionCourse->update($request->validated());

        return new SessionCourseResource($sessionCourse);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SessionCourse $sessionCourse)
    {
        return new SessionCourseResource($sessionCourse->delete());
    }
}
