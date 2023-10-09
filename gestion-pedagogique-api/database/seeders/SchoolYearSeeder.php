<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schoolYears = [
            "2010-2011",
            "2014-2015",
            "2015-2016",
            "2018-2019",
            "2019-2020",
            "2020-2021",
            "2021-2022",
            "2022-2023",
        ];

        foreach ($schoolYears as $key => $schoolYear) {
            \App\Models\SchoolYear::factory()->create([
                "name" => $schoolYear,
                "status" => $schoolYear === "2022-2023",
                "created_at" => now()->addSeconds($key),
                "updated_at" => now()->addSeconds($key),
            ]);
        }
    }
}
