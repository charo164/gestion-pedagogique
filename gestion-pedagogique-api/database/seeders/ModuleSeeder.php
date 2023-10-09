<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $module = [
            ["name" => "Programmation"],
            ["name" => "Design Pattern"],
            ["name" => "Management"],
            ["name" => "English"],
            ["name" => "Math"],
            ["name" => "UX Design"],
            ["name" => "Php"],
            ["name" => "Figma"],
            ["name" => "Javascript/Typescript"],
            ["name" => "Mysql"],
            ["name" => "Android"],
        ];


        foreach ($module as $key => $value) {
            \App\Models\Module::create($value);
        }
    }
}
