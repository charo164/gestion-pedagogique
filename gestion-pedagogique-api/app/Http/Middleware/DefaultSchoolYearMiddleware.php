<?php

namespace App\Http\Middleware;

use App\Models\SchoolYear;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultSchoolYearMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (in_array($request->method(), ['POST', 'PUT', 'PATCH', 'DELETE']) && !$request->has('school_year_id')) {
            $activeYear = SchoolYear::where('status', true)->first();
            if ($activeYear) $request->merge(['school_year_id' =>  $activeYear->id]);
        }

        if ($request->method() === 'GET' && !$request->has('school_year')) {
            $activeYear = SchoolYear::where('status', true)->first();
            if ($activeYear) $request->merge(['school_year' =>  $activeYear->id]);
        }

        if (!$request->has('school_year') && !$request->has('school_year_id')) {
            return response()->json([
                'message' => 'No school year provided',
            ], 400);
        };

        return $next($request);
    }
}
