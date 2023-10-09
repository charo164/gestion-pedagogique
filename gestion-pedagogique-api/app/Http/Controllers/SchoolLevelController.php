<?php

namespace App\Http\Controllers;

use App\Models\SchoolLevel;
use App\Http\Requests\StoreSchoolLevelRequest;
use App\Http\Requests\UpdateSchoolLevelRequest;
use App\Http\Resources\SchoolLevelResource;

class SchoolLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schoolLevelQuery = SchoolLevel::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('name')) {
            $schoolLevelQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if ($limit === 'all') return SchoolLevelResource::collection($schoolLevelQuery->get());

        $schoolLevels = $schoolLevelQuery->paginate($limit);

        return SchoolLevelResource::collection($schoolLevels);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSchoolLevelRequest $request)
    {
        return new SchoolLevelResource(SchoolLevel::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(SchoolLevel $schoolLevel)
    {
        return new SchoolLevelResource($schoolLevel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSchoolLevelRequest $request, SchoolLevel $schoolLevel)
    {
        return new SchoolLevelResource(tap($schoolLevel)->update($request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolLevel $schoolLevel)
    {
        return tap($schoolLevel)->delete();
    }
}
