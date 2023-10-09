<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\ValidationException;
use Mockery\Exception\InvalidOrderException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
        });
    }

    public function render($request, Throwable $exception)
    {
        $message = "Unexpected error !";
        $status = 500;
        $errors = [];

        if ($exception instanceof HttpException) {
            $message = $exception->getMessage();
            $status = $exception->getStatus();
        } elseif ($exception instanceof ValidationException) {
            $message = $exception->getMessage();
            $status = $exception->status;
            $errors = $exception->errors();
        }

        Log::error($exception->getMessage(), [
            "file" => $exception->getFile(),
            "line" => $exception->getLine()
        ]);

        return response()->json([
            "message" => $message,
            "status" => $status,
            "errors" => $errors,
        ], $status);
    }
}
