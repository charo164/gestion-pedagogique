<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttendanceListRequest;
use App\Http\Requests\UpdateAttendanceListRequest;
use App\Http\Resources\AttendanceListResource;
use App\Models\AttendanceList;

class AttendanceListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceListRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AttendanceList $attendanceList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceListRequest $request, AttendanceList $attendanceList)
    {
        $attendanceList->update($request->validated());

        return new AttendanceListResource($attendanceList);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AttendanceList $attendanceList)
    {
        //
    }
}
