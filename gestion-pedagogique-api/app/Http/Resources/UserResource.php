<?php

namespace App\Http\Resources;

use App\Core\Resources\AppJsonResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends AppJsonResource
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
            'email' => $this->email,
            'name'=> $this->name,
            'roles' => $this->roles()->pluck('name')->toArray(),
            'teacher' => $this->teacher ? [
                'rank' => $this->teacher->rank->name,
                'specialization' => $this->teacher->specialization->name,
            ] : null,
        ];
    }
}
