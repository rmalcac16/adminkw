<?php

namespace App\Http\Requests\Episodes;

use Illuminate\Foundation\Http\FormRequest;

class GenerateEpisodePlayersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'links' => ['required', 'string'],
            'server_id' => ['required', 'exists:servers,id'],
            'episode_initial' => ['required', 'integer', 'min:0'],
            'language' => ['required', 'in:0,1,2'],
        ];
    }

    public function messages(): array
    {
        return [
            'links.required' => 'Debes ingresar al menos un enlace.',
            'server_id.required' => 'El servidor es obligatorio.',
            'episode_initial.required' => 'El episodio inicial es obligatorio.',
            'language.in' => 'El idioma seleccionado no es válido.',
        ];
    }
}
