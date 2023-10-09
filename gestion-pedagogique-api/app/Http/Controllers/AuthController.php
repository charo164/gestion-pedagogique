<?php

namespace App\Http\Controllers;

use App\Exceptions\HttpException;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class AuthController extends Controller
{
    public function me()
    {
        /**
         * @var User $user
         */
        $user = auth()->user();

        return new UserResource($user);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->all();

        $data['password'] = bcrypt($request->password);

        $user = User::create($data);

        $token = $user->createToken('API Token')->accessToken;

        return response(["data" => ["token" => $token, "user" => new UserResource($user)]]);
    }

    public function login(LoginRequest $request)
    {
        auth()->shouldUse('web');

        if (!auth()->attempt($request->all())) {
            throw new HttpException('Password or email invalid!', 400);
        }

        /**
         * @var User $user
         */
        $user = auth()->user();
        $token = $user->createToken('API_TOKEN')->accessToken;

        return response(["data" => ["token" => $token, "user" => new UserResource($user)]]);
    }

    public function logout()
    {
        /**
         * @var User $user
         */
        $user = auth()->user();
        $user->token()->revoke();

        return response(['message' => 'Successfully logged out']);
    }
}
