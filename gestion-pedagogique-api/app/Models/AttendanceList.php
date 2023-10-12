<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceList extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_course_id',
        'time_in',
        'time_out',
        'status',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'user_id', 'id', 'users', 'student');
    }
}
