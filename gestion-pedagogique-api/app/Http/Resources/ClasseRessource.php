<?php

namespace App\Http\Resources;

use App\Core\Resources\AppJsonResource;
use Illuminate\Http\Request;

class ClasseRessource extends AppJsonResource
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
            'name' => $this->name,
            'field_of_study' => $this->fieldOfStudy->name,
            'school_level' => $this->schoolLevel->name,
            'school_year' => $this->schoolYear->name,
        ];
    }
}
