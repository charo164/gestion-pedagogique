<?php

namespace App\Http\Resources;

use App\Core\Resources\AppJsonResource;
use Illuminate\Http\Request;

class InscriptionResource extends AppJsonResource
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
            'student' => [
                "id" => $this->user->id,
                "name" => $this->user->name,
                "email" => $this->user->email,
                "matricule"=> $this->user->matricule,
                "birth_date" => $this->user->student->birth_date,
                "birth_place" => $this->user->student->birth_place,
            ],
            'classe' => $this->classe,
            'school_year' => $this->schoolYear->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
