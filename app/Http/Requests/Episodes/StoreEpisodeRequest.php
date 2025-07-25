<?php

namespace App\Http\Requests\Episodes;

use Illuminate\Foundation\Http\FormRequest;

class StoreEpisodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $anime = $this->route('anime');

        return [
            'number' => ['required', 'integer', 'min:0', 'unique:episodes,number,NULL,id,anime_id,' . $anime->id],
        ];
    }

    public function messages(): array
    {
        return [
            'number.required' => 'El número del episodio es obligatorio.',
            'number.integer' => 'El número del episodio debe ser un número entero.',
            'number.min' => 'El número del episodio debe ser como mínimo 0.',
            'number.unique' => 'Ya existe un episodio con ese número para este anime.',
        ];
    }
}
