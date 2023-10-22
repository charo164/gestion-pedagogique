<?php

namespace App\Rules;

use App\Models\User;
use App\Traits\AppPermissionTrait;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Log;

class IsAttache implements ValidationRule
{
    use AppPermissionTrait;
    /**
     * Indicates whether the rule should be implicit.
     *
     * @var bool
     */
    public $implicit = true;

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        /**
         * @var \App\Models\User
         */
        $user = User::find($value);

        if (!$user->hasRole($this::$ROLES['ATTACHE'])) {
            $fail('The user must be a attache.');
        }
    }
}
