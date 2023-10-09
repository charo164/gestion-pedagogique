<?php

namespace App\Http\Controllers;

use App\Models\FieldOfStudy;
use App\Http\Requests\StoreFieldOfStudyRequest;
use App\Http\Requests\UpdateFieldOfStudyRequest;
use App\Http\Resources\FieldOfStudyResource;

class FieldOfStudyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fieldOfStudyQuery = FieldOfStudy::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('name')) {
            $fieldOfStudyQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if ($limit === 'all') return FieldOfStudyResource::collection($fieldOfStudyQuery->get());

        $fieldOfStudies = $fieldOfStudyQuery->paginate($limit);

        return FieldOfStudyResource::collection($fieldOfStudies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFieldOfStudyRequest $request)
    {
        return new FieldOfStudyResource(FieldOfStudy::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(FieldOfStudy $fieldOfStudy)
    {
        return new FieldOfStudyResource($fieldOfStudy);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFieldOfStudyRequest $request, FieldOfStudy $fieldOfStudy)
    {
        return new FieldOfStudyResource(tap($fieldOfStudy)->update($request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FieldOfStudy $fieldOfStudy)
    {
        return new FieldOfStudyResource(tap($fieldOfStudy)->delete());
    }
}
