<?php

namespace App\Http\Requests;

use App\Traits\AppPermissionTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreSessionCourseRequest extends FormRequest
{
    use AppPermissionTrait;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $role = $user->roles()->first()->name;

        if ($role == $this::$ROLES['ADMIN'] || $role == $this::$ROLES['RP']) {
            return true;
        }

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'scheduled_course_id' => ['required', 'exists:scheduled_courses,id'],
            'classroom_id' => ['required', 'exists:classrooms,id'],
            'school_year_id' => ['sometimes', 'exists:school_years,id'],
        ];
    }
}
