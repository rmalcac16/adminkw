<?php

namespace App\Http\Requests\Players;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePlayerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $playerId = $this->route('player'); // Asegúrate que la ruta tenga el parámetro {player}

        return [
            'code' => [
                'sometimes',
                'required',
                'string',
                'max:512',
                Rule::unique('players', 'code')->ignore($playerId),
            ],
            'server_id' => [
                'sometimes',
                'required',
                'exists:servers,id',
            ],
            'episode_id' => [
                'sometimes',
                'required',
                'exists:episodes,id',
            ],
            'languaje' => [
                'sometimes',
                'required',
                'integer',
                Rule::unique('players')->where(function ($query) {
                    return $query
                        ->where('episode_id', $this->input('episode_id'))
                        ->where('server_id', $this->input('server_id'))
                        ->where('languaje', $this->input('languaje'));
                })->ignore($this->route('player')),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'code.unique' => 'Este código ya ha sido registrado.',
            'languaje.unique' => 'Ya existe un reproductor para este servidor en el mismo idioma en este episodio.',
        ];
    }
}
