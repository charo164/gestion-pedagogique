<?php

namespace App\Http\Resources;

use App\Core\Resources\AppJsonResource;
use Illuminate\Http\Request;

class SessionCourseResource extends AppJsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'canceled' => $this->canceled,
            'attache' => new UserResource($this->attache),
            'scheduled_course' => new  ScheduledCourseResource($this->scheduled_course),
            'attendance_lists' => AttendanceListResource::collection($this->attendance_lists),
            'classroom' => $this->classroom->name,
            'school_year' => $this->school_year->name,
        ];
    }
}
