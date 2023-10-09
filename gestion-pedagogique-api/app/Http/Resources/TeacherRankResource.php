<?php

namespace App\Http\Resources;

use App\Core\Resources\AppJsonResource;
use Illuminate\Http\Request;

class TeacherRankResource extends AppJsonResource
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
            'rank' => $this->rank,
        ];
    }
}
