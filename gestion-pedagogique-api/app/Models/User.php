<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\AppPermissionTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Symfony\Component\ErrorHandler\Debug;

use function Psy\debug;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'matricule',
        'profile',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public static function findOrCreateStudent(array $studentData)
    {
        $user = User::where('matricule', $studentData['matricule'])->first();

        if (!$user) {
            try {
                if ($user->hasRole('student')) {
                    throw new \Exception('This matricule is already used by a teacher');
                }

                $user = User::create([
                    'name' => $studentData['name'],
                    'email' => $studentData['email'],
                    'password' => bcrypt("password"),
                    'matricule' => uniqid("STD"),
                ]);

                $user->assignRole(AppPermissionTrait::$ROLES['STUDENT']);

                StudentInfo::create([
                    'user_id' => $user->id,
                    'birth_place' => $studentData['birth_place'],
                    'birth_date' => $studentData['birth_date'],
                ]);
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
                return null;
            }
        }

        return $user;
    }

    public static function boot()
    {
        parent::boot();

        self::created(function ($model) {
            if (!request()->has('role')) return;

            foreach (AppPermissionTrait::$ROLES as $key => $value) {
                if ($value === request()->get('role')) {
                    $model->assignRole($value);
                    break;
                }
            }

            if (request()->get('role') == AppPermissionTrait::$ROLES['PROFESSOR']) {
                TeacherInfo::create([
                    'user_id' => $model->id,
                    'teacher_rank_id' => request()->get('rank'),
                    'specialization_id' => request()->get('specialization'),
                ]);
            }
        });
    }

    /**
     * Get the student info associated with the user.
     */
    public function student()
    {
        return $this->hasOne(StudentInfo::class);
    }

    /**
     * Get the teacher info associated with the user.
     */
    public function teacher()
    {
        return $this->hasOne(TeacherInfo::class);
    }
}
