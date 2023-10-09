<?php

namespace App\Http\Controllers;

use App\Models\Specialization;
use App\Http\Requests\StoreSpecializationRequest;
use App\Http\Requests\UpdateSpecializationRequest;
use App\Http\Resources\SpecializationResource;

class SpecializationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $specializationQuery = Specialization::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('name')) {
            $specializationQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if (request()->has('field_of_study')) {
            $specializationQuery->where('field_of_study_id', request()->query('field_of_study'));
        }

        if ($limit === 'all') return SpecializationResource::collection($specializationQuery->get());

        $specializations = $specializationQuery->paginate($limit);

        return SpecializationResource::collection($specializations);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSpecializationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Specialization $specialization)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Specialization $specialization)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSpecializationRequest $request, Specialization $specialization)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Specialization $specialization)
    {
        //
    }
}
