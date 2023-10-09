<?php

namespace App\Http\Resources;

use App\Core\Resources\AppJsonResource;
use Illuminate\Http\Request;

class ScheduledCourseResource extends AppJsonResource
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
            'total_hours' => $this->total_hours,
            'scheduled_hours' => $this->scheduled_hours,
            'type' => $this->type,
            'module' => $this->module->name,
            'user' => $this->user->name,
            'classe' => $this->classe->name,
            'school_year' => $this->schoolYear->name,
        ];
    }
}
