<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherInfo extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'teacher_rank_id',
        'specialization_id',
        'user_id',
    ];


    public function rank()
    {
        return $this->belongsTo(TeacherRank::class, 'teacher_rank_id', 'id', 'teacher_ranks');
    }

    public function specialization()
    {
        return $this->belongsTo(Specialization::class, 'specialization_id', 'id', 'specializations');
    }
}
