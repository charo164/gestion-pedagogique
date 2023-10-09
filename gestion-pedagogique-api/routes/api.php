<?php

use App\Http\Middleware\DefaultSchoolYearMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Traits\AppPermissionTrait;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

$userPermission = join('|', [AppPermissionTrait::$PERMISSIONS["GERER_UTILISATEURS"], AppPermissionTrait::$PERMISSIONS["GERER_PROFESSEURS"]]);
Route::middleware(['auth:api'])->group(function () use ($userPermission) {
    Route::post('auth/register', [\App\Http\Controllers\AuthController::class, 'register'])->middleware("permission:$userPermission");
    Route::get('auth/me', [\App\Http\Controllers\AuthController::class, 'me']);
});

Route::post('auth/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

Route::middleware(["default_school_year", "auth:api"])->group(function () {
    Route::apiResource('school-years', \App\Http\Controllers\SchoolYearController::class);
    Route::apiResource('school-levels', \App\Http\Controllers\SchoolLevelController::class);
    Route::apiResource('field-of-studies', \App\Http\Controllers\FieldOfStudyController::class);
    Route::apiResource('semesters', \App\Http\Controllers\SemesterController::class);
    Route::apiResource('classrooms', \App\Http\Controllers\ClassroomController::class);
    Route::apiResource('classes', \App\Http\Controllers\ClasseController::class);
    Route::apiResource('modules', \App\Http\Controllers\ModuleController::class);
    Route::apiResource('scheduled-courses', \App\Http\Controllers\ScheduledCourseController::class);
    Route::apiResource('session-courses', \App\Http\Controllers\SessionCourseController::class);
    Route::apiResource('users', \App\Http\Controllers\UserController::class);
});
