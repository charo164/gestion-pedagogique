<?php

namespace Database\Seeders;

use App\Models\FieldOfStudy;
use App\Models\SchoolLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClasseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lastSchoolYear = \App\Models\SchoolYear::orderBy('id', 'desc')->first();

        $fieldOfStudies = FieldOfStudy::all();

        foreach ($fieldOfStudies as $fieldOfStudy) {
            $schoolLevels = SchoolLevel::all();

            foreach ($schoolLevels as $schoolLevels) {
                \App\Models\Classe::create([
                    "name" => $schoolLevels->name . " A",
                    "school_year_id" => $lastSchoolYear->id,
                    "school_level_id" => $schoolLevels->id,
                    "field_of_study_id" => $fieldOfStudy->id,
                ]);
            }
        }
    }
}
