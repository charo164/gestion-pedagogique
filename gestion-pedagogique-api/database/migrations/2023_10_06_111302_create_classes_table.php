<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('field_of_study_id');
            $table->unsignedBigInteger('school_level_id');
            $table->unsignedBigInteger('school_year_id');
            $table->foreign('school_level_id')->references('id')->on('school_levels')->onDelete('cascade');
            $table->foreign('field_of_study_id')->references('id')->on('field_of_studies')->onDelete('cascade');
            $table->foreign('school_year_id')->references('id')->on('school_years')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
