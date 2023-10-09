<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Http\Requests\StoreClasseRequest;
use App\Http\Requests\UpdateClasseRequest;
use App\Http\Resources\ClasseRessource;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $classeQuery = Classe::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('field_of_study')) {
            $classeQuery->where('field_of_study_id', request()->query('field_of_study'));
        }

        if (request()->has('school_level')) {
            $classeQuery->where('school_level_id', request()->query('school_level_id'));
        }

        if (request()->has('school_year')) {
            $classeQuery->where('school_year_id', request()->query('school_year'));
        }

        if (request()->has('name')) {
            $classeQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if ($limit === 'all') return ClasseRessource::collection($classeQuery->get());

        $classes = $classeQuery->paginate($limit);

        return ClasseRessource::collection($classes);
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
    public function store(StoreClasseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Classe $classe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Classe $classe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClasseRequest $request, Classe $classe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classe $classe)
    {
        //
    }
}
