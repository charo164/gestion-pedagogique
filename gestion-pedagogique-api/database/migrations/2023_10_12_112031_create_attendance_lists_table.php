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
        Schema::create('attendance_lists', function (Blueprint $table) {
            $table->id();
            $table->boolean('status')->default(false);
            $table->dateTime('time_in')->nullable();
            $table->dateTime('time_out')->nullable();
            $table->unsignedBigInteger('session_course_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('session_course_id')->references('id')->on('session_courses')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['session_course_id', 'user_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_lists');
    }
};
