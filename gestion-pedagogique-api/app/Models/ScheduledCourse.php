<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduledCourse extends Model
{
    use HasFactory;


    protected $fillable = [
        'total_hours',
        'scheduled_hours',
        'type',
        'module_id',
        'user_id',
        'classe_id',
        'school_year_id',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
