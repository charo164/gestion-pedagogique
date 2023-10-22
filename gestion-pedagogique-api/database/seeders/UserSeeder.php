<?php

namespace Database\Seeders;

use App\Models\FieldOfStudy;
use App\Models\SchoolLevel;
use App\Traits\AppPermissionTrait;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
  use AppPermissionTrait;
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    foreach ($this->getAppRolesWithPermissions() as $role => $permissions) {
      $role = Role::firstOrCreate(['name' => $role, "guard_name" => "api"]);

      foreach ($permissions as $permission) {
        $permission = Permission::firstOrCreate(['name' => $permission, "guard_name" => "api"]);
        $role->givePermissionTo($permission);
      }
    }

    $admin = \App\Models\User::factory()->create([
      'name' => 'Admin User',
      'email' => 'admin@example.com',
      'password' => bcrypt('password'),
    ]);

    $admin->assignRole('admin');

    $rp = \App\Models\User::factory()->create([
      'name' => 'Rp User',
      'email' => 'rp@example.com',
      'profile' => 'https://randomuser.me/api/portraits/women/17.jpg',
      'password' => bcrypt('password'),
    ]);

    $rp->assignRole('rp');

    $prof = \App\Models\User::factory()->create([
      'name' => 'Professor User',
      'email' => 'professor@example.com',
      'profile'=> 'https://randomuser.me/api/portraits/women/88.jpg',
      'password' => bcrypt('password'),
    ]);

    $prof->assignRole('professor');

    \App\Models\TeacherInfo::factory()->create([
      'user_id' => $prof->id,
      'specialization_id' => 1,
      'teacher_rank_id' => 1,
    ]);

    $attache = \App\Models\User::factory()->create([
      'name' => 'Attache User',
      'email' => 'attache@example.com',
      'profile'=> 'https://randomuser.me/api/portraits/women/69.jpg',
      'password' => bcrypt('password'),
    ]);

    $attache->assignRole('attache');
  }
}
