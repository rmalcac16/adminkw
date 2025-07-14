<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->route('user');
        return [
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => __('users.validation.email_required'),
            'email.email' => __('users.validation.email_invalid'),
            'email.max' => __('users.validation.email_max_length'),
            'email.unique' => __('users.validation.email_unique'),
        ];
    }
}
