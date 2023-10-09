<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolYear extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
    ];

    public static function boot()
    {
        parent::boot();

        self::updated(function ($model) {
            if ($model->status == true) {
                SchoolYear::where('id', '!=', $model->id)->update(['status' => false]);
            }
        });
    }
}
