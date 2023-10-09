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
        Schema::create('scheduled_courses', function (Blueprint $table) {
            $table->id();
            $table->float('total_hours');
            $table->float('scheduled_hours')->default(0.0);
            $table->enum('type', ['online', 'offline'])->default('offline');
            $table->unsignedBigInteger('module_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('classe_id');
            $table->unsignedBigInteger('school_year_id');
            $table->foreign('classe_id')->references('id')->on('classes')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->foreign('school_year_id')->references('id')->on('school_years')->onDelete('cascade');
            $table->unique(['user_id', 'classe_id', 'school_year_id', 'module_id'], "unique_course");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scheduled_courses');
    }
};
