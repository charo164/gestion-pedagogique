<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FieldOfStudySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fieldOfStudies = [
            "Reference Digital" => [
                "UX/UI Designer",
            ],
            "Dev Web et Mobile" => [
                "Développeur Web",
                "Développeur Mobile",
                "Programmation",
            ],
            "Hacheuse" => [
                "Excel",
                "Word",
            ],
            "Data Analyste" => [
                "Machine Learning",
                "Data Science",
            ]
        ];

        foreach ($fieldOfStudies as $fieldOfStudy => $specializations) {
            $fieldOfStudy = \App\Models\FieldOfStudy::factory()->create([
                'name' => $fieldOfStudy,
            ]);

            foreach ($specializations as $specialization) {
                \App\Models\Specialization::factory()->create([
                    'name' => $specialization,
                    'field_of_study_id' => $fieldOfStudy->id,
                ]);
            }
        }
    }
}
