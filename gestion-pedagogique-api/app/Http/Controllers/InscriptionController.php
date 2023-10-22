<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use App\Http\Requests\StoreInscriptionRequest;
use App\Http\Requests\UpdateInscriptionRequest;
use App\Http\Resources\InscriptionResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class InscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inscriptionQuery = Inscription::query()->orderBy('created_at', 'desc');

        $limit = request()->query('limit', 10);

        if (request()->has('q') && request()->query('q') !== '') {
            $inscriptionQuery->whereHas('user', function ($query) {
                $query->where('name', 'like', '%' . request()->query('q') . '%');
            })->orWhereHas('classe', function ($query) {
                $query->where('name', 'like', '%' . request()->query('q') . '%');
            })->orWhereHas('schoolYear', function ($query) {
                $query->where('name', 'like', '%' . request()->query('q') . '%');
            });
        }

        if (request()->has('school_year') && request()->query('school_year') !== '') {
            $inscriptionQuery->where('school_year_id', request()->query('school_year'));
        }

        if (request()->has('classe') && request()->query('classe') !== '') {
            $inscriptionQuery->where('classe_id', request()->query('classe'));
        }

        if (request()->has('user') && request()->query('user') !== '') {
            $inscriptionQuery->where('user_id', request()->query('user'));
        }

        if ($limit === 'all') return InscriptionResource::collection($inscriptionQuery->get());

        $inscriptions = $inscriptionQuery->paginate($limit);

        return InscriptionResource::collection($inscriptions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInscriptionRequest $request)
    {
        $data =  DB::transaction(function () use ($request) {
            $success = [];
            $errors = [];

            $inscriptions = array_map(function ($student) use ($request, &$success, &$errors) {
                $user = User::findOrCreateStudent($student);

                if ($user == null) {
                    $errors[] = $student;
                    return null;
                }

                $success[] = $student;

                return [
                    'user_id' => $user->id,
                    'classe_id' => $request->classe_id,
                    'school_year_id' => $request->school_year_id,
                ];
            }, $request->students);

            $inscriptions = array_filter($inscriptions, function ($ins) {
                return $ins !== null;
            });

            Inscription::insert($inscriptions);

            return [
                'success' => $success,
                'errors' => $errors,
            ];
        });


        return response()->json(['data' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inscription $inscription)
    {
        return new InscriptionResource($inscription);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInscriptionRequest $request, Inscription $inscription)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inscription $inscription)
    {
        $inscription->delete();

        return response()->json([
            'data' => null,
            'message' => 'Inscription deleted successfully',
        ]);
    }
}
