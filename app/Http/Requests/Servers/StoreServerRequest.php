<?php

namespace App\Http\Requests\Servers;

use Illuminate\Foundation\Http\FormRequest;

class StoreServerRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:20'],
            'embed' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'boolean'],
            'position' => ['nullable', 'integer'],
            'show_on_web_desktop' => ['required', 'boolean'],
            'show_on_web_mobile' => ['required', 'boolean'],
            'show_on_app' => ['required', 'boolean'],
            'domains' => ['nullable', 'array'],
            'domains.*' => ['string', 'max:255'],
        ];
    }
}
