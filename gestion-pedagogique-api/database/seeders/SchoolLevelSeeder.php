<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schoolLevels = ["L1", "L2", "L3", "M1", "M2"];

        foreach ($schoolLevels as $schoolLevel) {
            \App\Models\SchoolLevel::factory()->create([
                "name" => $schoolLevel,
            ]);
        }
    }
}
