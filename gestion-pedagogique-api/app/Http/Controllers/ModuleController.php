<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Http\Requests\StoreModuleRequest;
use App\Http\Requests\UpdateModuleRequest;
use App\Http\Resources\ModuleResource;
use App\Models\SchoolYear;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $moduleQuery = Module::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('name')) {
            $moduleQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if ($limit === 'all') return ModuleResource::collection($moduleQuery->get());

        $modules = $moduleQuery->paginate($limit);

        return ModuleResource::collection($modules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreModuleRequest $request)
    {
        return new ModuleResource(Module::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Module $module)
    {
        return new ModuleResource($module);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateModuleRequest $request, Module $module)
    {
        return new ModuleResource(tap($module)->update($request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        return new ModuleResource(tap($module)->delete());
    }
}
