<?php

namespace App\Http\Requests\Players;

use App\Models\Server;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePlayerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->filled(['code', 'server_id'])) {
            $server = Server::find($this->input('server_id'));

            if ($server && is_array($server->domains)) {
                $data = extractVideoData($this->input('code'));

                if ($data) {
                    $this->merge([
                        'code' => $data['id'],
                        'code_backup' => $data['backupUrl'],
                    ]);
                }
            }
        }
    }

    public function rules(): array
    {
        return [
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('players')->where(
                    fn($query) =>
                    $query->where('server_id', $this->server_id)
                ),
            ],
            'code_backup' => ['nullable', 'string', 'max:150'],
            'server_id' => ['required', 'exists:servers,id'],
            'episode_id' => ['required', 'exists:episodes,id'],
            'languaje' => ['required', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'code.required'   => 'El campo código es obligatorio.',
            'code.string'     => 'El código debe ser una cadena de texto válida.',
            'code.max'        => 'El código no puede tener más de 50 caracteres.',
            'code.unique'     => 'Este código ya está registrado para el servidor seleccionado.',

            'code_backup.string' => 'El código de respaldo debe ser una cadena de texto válida.',
            'code_backup.max'    => 'El código de respaldo no puede tener más de 150 caracteres.',

            'server_id.required' => 'Debe seleccionar un servidor.',
            'server_id.exists'   => 'El servidor seleccionado no existe en el sistema.',

            'episode_id.required' => 'Debe seleccionar un episodio.',
            'episode_id.exists'   => 'El episodio seleccionado no existe en el sistema.',

            'languaje.required' => 'Debe especificar un idioma.',
            'languaje.integer'  => 'El idioma debe ser un valor numérico válido.',
        ];
    }
}
