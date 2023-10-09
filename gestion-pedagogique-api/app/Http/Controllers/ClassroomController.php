<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Http\Requests\StoreClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use App\Http\Resources\ClassroomResource;

class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classroomQuery = Classroom::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('name')) {
            $classroomQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if (request()->has('capacity')) {
            $classroomQuery->where('capacity', '>=', request()->query('capacity'));
        }

        if ($limit === 'all') return ClassroomResource::collection($classroomQuery->get());

        $classrooms = $classroomQuery->paginate($limit);

        return ClassroomResource::collection($classrooms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassroomRequest $request)
    {
        return new ClassroomResource(Classroom::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Classroom $classroom)
    {
        return new ClassroomResource($classroom);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassroomRequest $request, Classroom $classroom)
    {
        return new ClassroomResource(tap($classroom)->update($request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classroom $classroom)
    {
        return new ClassroomResource(tap($classroom)->delete());
    }
}
