<?php

namespace App\Http\Controllers;

use App\Exceptions\HttpException;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\AppPermissionTrait;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use AppPermissionTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        /**
         * @var User $user
         */
        $user = auth()->user();

        $userQuery = User::query()->orderBy('created_at', 'desc');

        if (request()->has('name')) {
            $userQuery->where('name', 'like', "%" . request()->query('name') . "%");
        }

        if ($user->can($this::$PERMISSIONS["GERER_UTILISATEURS"])) {
            if (request()->has('role')) {
                $userQuery->whereHas('roles', function ($query) {
                    $query->where('name', request()->query('role'));
                });
            }

            $limit = request()->query('limit', 10);
            if ($limit === 'all') {
                return UserResource::collection($userQuery->get());
            }

            $users = $userQuery->paginate($limit);
            return UserResource::collection($users);
        }

        $rolesCanSee = [];
        $requestRole = request()->query('role') ?? null;

        if ($user->can($this::$PERMISSIONS["GERER_PROFESSEURS"]) && ($requestRole === $this::$ROLES["PROFESSOR"] || $requestRole === null)) {
            $rolesCanSee[] = $this::$ROLES["PROFESSOR"];
        }

        if ($user->can($this::$PERMISSIONS["GERER_ETUDIANTS"]) && ($requestRole === $this::$ROLES["STUDENT"] || $requestRole === null)) {
            $rolesCanSee[] = $this::$ROLES["STUDENT"];
        }

        if (count($rolesCanSee) > 0) {
            $userQuery->whereHas('roles', function ($query) use ($rolesCanSee) {
                $query->whereIn('name', $rolesCanSee);
            });

            $limit = request()->query('limit', 10);

            if ($limit === 'all') {
                return UserResource::collection($userQuery->get());
            }

            $users = $userQuery->paginate($limit);
            return UserResource::collection($users);
        }

        throw new HttpException('You are not allowed to see this resource', 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return new UserResource(User::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        return new UserResource(tap($user)->update($request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        return new UserResource(tap($user)->delete());
    }
}
