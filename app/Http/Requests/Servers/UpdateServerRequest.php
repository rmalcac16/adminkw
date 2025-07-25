<?php

namespace App\Http\Requests\Servers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => [
                'sometimes',
                'string',
                'max:20',
                Rule::unique('servers', 'title')->ignore($this->route('server'))
            ],
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

    public function messages(): array
    {
        return [
            'title.string' => 'El título debe ser una cadena de texto.',
            'title.max' => 'El título no debe tener más de 20 caracteres.',
            'title.unique' => 'Ya existe un servidor con ese título.',

            'embed.string' => 'El embed debe ser una cadena de texto.',
            'embed.max' => 'El embed no debe tener más de 100 caracteres.',

            'status.boolean' => 'El estado debe ser verdadero o falso.',
            'position.integer' => 'La posición debe ser un número entero.',

            'show_on_web_desktop.boolean' => 'El campo "Mostrar en web (escritorio)" debe ser verdadero o falso.',
            'show_on_web_mobile.boolean' => 'El campo "Mostrar en web (móvil)" debe ser verdadero o falso.',
            'show_on_app.boolean' => 'El campo "Mostrar en app" debe ser verdadero o falso.',

            'domains.array' => 'El campo dominios debe ser una lista de valores.',
            'domains.*.string' => 'Cada dominio debe ser una cadena de texto.',
            'domains.*.max' => 'Cada dominio no debe superar los 255 caracteres.',
        ];
    }
}
