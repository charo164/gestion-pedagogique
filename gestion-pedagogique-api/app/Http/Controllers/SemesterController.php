<?php

namespace App\Http\Controllers;

use App\Models\Semester;
use App\Http\Requests\StoreSemesterRequest;
use App\Http\Requests\UpdateSemesterRequest;
use App\Http\Resources\SemesterResource;

class SemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $semesterQuery = Semester::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('name')) {
            $semesterQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if ($limit === 'all') return SemesterResource::collection($semesterQuery->get());

        $semesters = $semesterQuery->paginate($limit);

        return SemesterResource::collection($semesters);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSemesterRequest $request)
    {
        return new SemesterResource(Semester::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Semester $semester)
    {
        return new SemesterResource($semester);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSemesterRequest $request, Semester $semester)
    {
        return new SemesterResource(tap($semester)->update($request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Semester $semester)
    {
        return new SemesterResource(tap($semester)->delete());
    }
}
