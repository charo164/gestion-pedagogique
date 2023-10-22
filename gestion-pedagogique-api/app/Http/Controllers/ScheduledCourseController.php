<?php

namespace App\Http\Controllers;

use App\Models\ScheduledCourse;
use App\Http\Requests\StoreScheduledCourseRequest;
use App\Http\Requests\UpdateScheduledCourseRequest;
use App\Http\Resources\ScheduledCourseResource;

class ScheduledCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $scheduledCourseQuery = ScheduledCourse::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('q') && request()->query('q') !== '') {
            $scheduledCourseQuery->whereHas('module', function ($query) {
                $query->where('name', 'like', '%' . request()->query('q') . '%');
            })->orWhereHas('classe', function ($query) {
                $query->where('name', 'like', '%' . request()->query('q') . '%');
            })->orWhereHas('schoolYear', function ($query) {
                $query->where('name', 'like', '%' . request()->query('q') . '%');
            })->orWhereHas('user', function ($query) {
                $query->where('name', 'like', '%' . request()->query('q') . '%');
            });
        }

        if (request()->has('module') && request()->query('module') !== '') {
            $scheduledCourseQuery->where('module_id', request()->query('module'));
        }

        if (request()->has('school_year') && request()->query('school_year') !== '') {
            $scheduledCourseQuery->where('school_year_id', request()->query('school_year'));
        }

        if (request()->has('classe') && request()->query('classe') !== '') {
            $scheduledCourseQuery->where('classe_id', request()->query('classe'));
        }

        if (request()->has('professor') && request()->query('professor') !== '') {
            $scheduledCourseQuery->where('user_id', request()->query('professor'));
        }

        if (request()->has('type') && request()->query('type') !== '') {
            $scheduledCourseQuery->where('type', request()->query('type'));
        }

        if ($limit === 'all') return ScheduledCourseResource::collection($scheduledCourseQuery->get());

        $scheduledCourses = $scheduledCourseQuery->paginate($limit);

        return ScheduledCourseResource::collection($scheduledCourses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduledCourseRequest $request)
    {
        return new ScheduledCourseResource(ScheduledCourse::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(ScheduledCourse $scheduledCourse)
    {
        return new ScheduledCourseResource($scheduledCourse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduledCourseRequest $request, ScheduledCourse $scheduledCourse)
    {
        return new ScheduledCourseResource(tap($scheduledCourse)->update($request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScheduledCourse $scheduledCourse)
    {
        return new ScheduledCourseResource(tap($scheduledCourse)->delete());
    }
}
