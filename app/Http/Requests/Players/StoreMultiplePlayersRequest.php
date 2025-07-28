<?php

namespace App\Http\Requests\Players;

use App\Models\Server;
use App\Services\VideoService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class StoreMultiplePlayersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('players') && is_array($this->players)) {
            $cleanedPlayers = [];

            foreach ($this->players as $index => $player) {
                if (!empty($player['code']) && !empty($player['server_id'])) {
                    $server = Server::find($player['server_id']);

                    if ($server && is_array($server->domains)) {
                        $data = VideoService::extractVideoData($player['code']);

                        if ($data) {
                            $player['code'] = $data['id'];
                            $player['code_backup'] = $data['backupUrl'];
                        }
                    }
                }
                $cleanedPlayers[$index] = $player;
            }

            $this->merge(['players' => $cleanedPlayers]);
        }
    }

    public function rules(): array
    {
        return [
            'players' => ['required', 'array', 'min:1'],
            'players.*.code' => [
                'required',
                'string',
                'max:512',
                function ($attribute, $value, $fail) {
                    $index = explode('.', $attribute)[1] ?? null;
                    $serverId = $this->input("players.$index.server_id");

                    if ($serverId) {
                        $exists = DB::table('players')
                            ->where('server_id', $serverId)
                            ->where('code', $value)
                            ->exists();

                        if ($exists) {
                            $fail("El código ya está registrado para el servidor seleccionado.");
                        }
                    }
                },
            ],
            'players.*.code_backup' => ['nullable', 'string', 'max:1024'],
            'players.*.server_id' => ['required', 'exists:servers,id'],
            'players.*.episode_id' => ['required', 'exists:episodes,id'],
            'players.*.languaje' => ['required', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'players.required' => 'Debe enviar al menos un player.',
            'players.array'    => 'El formato de los players no es válido.',
            'players.min'      => 'Debe enviar al menos un player.',

            'players.*.code.required' => 'El campo código es obligatorio.',
            'players.*.code.string'   => 'El código debe ser una cadena de texto válida.',
            'players.*.code.max'      => 'El código no puede tener más de 512 caracteres.',

            'players.*.code_backup.string' => 'El código de respaldo debe ser una cadena de texto válida.',
            'players.*.code_backup.max'    => 'El código de respaldo no puede tener más de 1024 caracteres.',

            'players.*.server_id.required' => 'Debe seleccionar un servidor.',
            'players.*.server_id.exists'   => 'El servidor seleccionado no existe en el sistema.',

            'players.*.episode_id.required' => 'Debe seleccionar un episodio.',
            'players.*.episode_id.exists'   => 'El episodio seleccionado no existe en el sistema.',

            'players.*.languaje.required' => 'Debe especificar un idioma.',
            'players.*.languaje.integer'  => 'El idioma debe ser un valor numérico válido.',
        ];
    }
}
