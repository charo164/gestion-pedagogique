<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'field_of_study_id',
        'school_level_id',
        'school_year_id',
    ];

    public function fieldOfStudy()
    {
        return $this->belongsTo(FieldOfStudy::class);
    }

    public function schoolLevel()
    {
        return $this->belongsTo(SchoolLevel::class);
    }

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }
}
