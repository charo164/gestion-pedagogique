<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SemesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $semestres = ["Semestre 1", "Semestre 2"];

        foreach ($semestres as $semestre) {
            \App\Models\Semester::factory()->create([
                "name" => $semestre,
            ]);
        }
    }
}
