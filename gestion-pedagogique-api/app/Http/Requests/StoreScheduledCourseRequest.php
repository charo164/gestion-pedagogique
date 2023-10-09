<?php

namespace App\Http\Requests;

use App\Rules\IsProfessor;
use App\Traits\AppPermissionTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Factory as ValidationFactory;

class StoreScheduledCourseRequest extends FormRequest
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
        $user = $this->user();

        return $user->can($this::$PERMISSIONS["PLANIFIER_COURS"]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'total_hours' => ['required', 'integer', 'min:1'],
            'type' => ['required', 'string', 'in:online,offline'],
            'module_id' => ['required', 'integer', 'exists:modules,id'],
            'user_id' => ['required', 'integer', 'exists:users,id', new IsProfessor()],
            'classe_id' => ['required', 'integer', 'exists:classes,id'],
            'school_year_id' => ['sometimes', 'integer', 'exists:school_years,id'],
        ];
    }
}
