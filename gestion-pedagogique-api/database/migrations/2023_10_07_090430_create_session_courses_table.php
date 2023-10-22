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
        Schema::create('session_courses', function (Blueprint $table) {
            $table->id();
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->boolean('canceled')->default(false);
            $table->unsignedBigInteger('attache_id');
            $table->unsignedBigInteger('scheduled_course_id');
            $table->unsignedBigInteger('classroom_id');
            $table->unsignedBigInteger('school_year_id');
            $table->foreign('attache_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('scheduled_course_id')->references('id')->on('scheduled_courses')->onDelete('cascade');
            $table->foreign('classroom_id')->references('id')->on('classrooms')->onDelete('cascade');
            $table->foreign('school_year_id')->references('id')->on('school_years')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_courses');
    }
};
