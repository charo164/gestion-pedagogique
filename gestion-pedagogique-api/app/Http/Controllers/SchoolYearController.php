<?php

namespace App\Http\Controllers;

use App\Exceptions\HttpException;
use App\Models\SchoolYear;
use App\Http\Requests\StoreSchoolYearRequest;
use App\Http\Requests\UpdateSchoolYearRequest;
use App\Http\Resources\SchoolYearResource;

class SchoolYearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schoolYearQuery = SchoolYear::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('name')) {
            $schoolYearQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if ($limit === 'all') return SchoolYearResource::collection($schoolYearQuery->get());

        $schoolYears = $schoolYearQuery->paginate($limit);

        return SchoolYearResource::collection($schoolYears);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSchoolYearRequest $request)
    {
        return new SchoolYearResource(SchoolYear::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(SchoolYear $schoolYear)
    {
        return new SchoolYearResource($schoolYear);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSchoolYearRequest $request, SchoolYear $schoolYear)
    {
        $active = request()->school_year_id ?? null;

        if ($active !== null && $active == $schoolYear->id && $request->status === false) {
            throw new HttpException('You cannot deactivate the active school year', 400);
        }

        $schoolYear->update($request->validated());

        return new SchoolYearResource($schoolYear);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolYear $schoolYear)
    {
        if ($schoolYear->status) {
            throw new HttpException('You cannot delete the active school year', 400);
        }

        $schoolYear->delete();

        return new SchoolYearResource($schoolYear);
    }
}
