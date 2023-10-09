<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Traits\AppPermissionTrait;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    use AppPermissionTrait;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // SCHOOL YEAR SEEDER
        $this->call(SchoolYearSeeder::class);

        // SCHOOL LEVEL SEEDER
        $this->call(SchoolLevelSeeder::class);

        // FIELD OF STUDY SEEDER
        $this->call(FieldOfStudySeeder::class);

        // SEMESTER SEEDER
        $this->call(SemesterSeeder::class);

        // TEACHER RANK SEEDER
        $this->call(TeacherRankSeeder::class);

        // CLASSROOM SEEDER
        $this->call(ClassroomSeeder::class);

        // CLASSE SEEDER
        $this->call(ClasseSeeder::class);

        // MODULE SEEDER
        $this->call(ModuleSeeder::class);

        // USER SEEDER
        $this->call(UserSeeder::class);
    }
}
