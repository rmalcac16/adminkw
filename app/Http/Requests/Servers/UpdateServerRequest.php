<?php

namespace App\Http\Requests\Servers;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // permitir la validación
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:20'],
            'embed' => ['sometimes', 'nullable', 'string', 'max:100'],
            'status' => ['sometimes', 'boolean'],
            'position' => ['sometimes', 'nullable', 'integer'],
            'show_on_web_desktop' => ['sometimes', 'boolean'],
            'show_on_web_mobile' => ['sometimes', 'boolean'],
            'show_on_app' => ['sometimes', 'boolean'],
            'domains' => ['sometimes', 'nullable', 'array'],
            'domains.*' => ['string', 'max:255'],
        ];
    }
}
