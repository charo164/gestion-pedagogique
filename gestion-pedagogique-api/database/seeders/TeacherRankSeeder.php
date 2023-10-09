<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeacherRankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teacherRanks = ["Professeur Assistant", "Professeur Agrégé", "Professeur Invité"];

        foreach ($teacherRanks as $teacherRank) {
            \App\Models\TeacherRank::factory()->create([
                'name' => $teacherRank,
            ]);
        }
    }
}
