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
            'title' => ['required', 'string', 'max:20', 'unique:servers,title'],
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

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio.',
            'title.string' => 'El título debe ser una cadena de texto.',
            'title.max' => 'El título no debe superar los 20 caracteres.',
            'title.unique' => 'Ya existe un servidor con ese título.',

            'embed.string' => 'El embed debe ser una cadena de texto.',
            'embed.max' => 'El embed no debe superar los 100 caracteres.',

            'status.required' => 'El estado es obligatorio.',
            'status.boolean' => 'El estado debe ser verdadero o falso.',

            'position.integer' => 'La posición debe ser un número entero.',

            'show_on_web_desktop.required' => 'El campo "Mostrar en web (escritorio)" es obligatorio.',
            'show_on_web_desktop.boolean' => 'El campo "Mostrar en web (escritorio)" debe ser verdadero o falso.',

            'show_on_web_mobile.required' => 'El campo "Mostrar en web (móvil)" es obligatorio.',
            'show_on_web_mobile.boolean' => 'El campo "Mostrar en web (móvil)" debe ser verdadero o falso.',

            'show_on_app.required' => 'El campo "Mostrar en app" es obligatorio.',
            'show_on_app.boolean' => 'El campo "Mostrar en app" debe ser verdadero o falso.',

            'domains.array' => 'El campo dominios debe ser una lista.',
            'domains.*.string' => 'Cada dominio debe ser una cadena de texto.',
            'domains.*.max' => 'Cada dominio no debe superar los 255 caracteres.',
        ];
    }
}
