<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherInfo extends Model
{
    use HasFactory;



    public function rank()
    {
        return $this->belongsTo(TeacherRank::class, 'teacher_rank_id', 'id', 'teacher_ranks');
    }

    public function specialization()
    {
        return $this->belongsTo(Specialization::class, 'specialization_id', 'id', 'specializations');
    }
}
