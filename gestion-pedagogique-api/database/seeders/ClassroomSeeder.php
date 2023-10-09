<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classrooms = [
            ['name' => "Salle 1A", "capacity" => 10],
            ['name' => "Salle 2B", "capacity" => 20],
            ['name' => "Salle 3A", "capacity" => 30],
            ['name' => "Salle 3C", "capacity" => 40],
        ];

        foreach ($classrooms as $classroom) {
            \App\Models\Classroom::create($classroom);
        }
    }
}
