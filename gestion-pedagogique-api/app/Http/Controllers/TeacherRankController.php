<?php

namespace App\Http\Controllers;

use App\Models\TeacherRank;
use App\Http\Requests\StoreTeacherRankRequest;
use App\Http\Requests\UpdateTeacherRankRequest;
use App\Http\Resources\TeacherRankResource;

class TeacherRankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teacherRankQuery = TeacherRank::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('name')) {
            $teacherRankQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if ($limit === 'all') return TeacherRankResource::collection($teacherRankQuery->get());

        $teacherRanks = $teacherRankQuery->paginate($limit);

        return TeacherRankResource::collection($teacherRanks);
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
    public function store(StoreTeacherRankRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TeacherRank $teacherRank)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TeacherRank $teacherRank)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRankRequest $request, TeacherRank $teacherRank)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeacherRank $teacherRank)
    {
        //
    }
}
