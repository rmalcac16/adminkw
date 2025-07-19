<?php

namespace App\Http\Requests\Players;

use App\Models\Server;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use InvalidArgumentException;

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
                $original = $this->input('code');
                $cleaned = $this->extractId($original);

                $this->merge([
                    'code' => $cleaned,
                    'code_backup' => $original,
                ]);
            }
        }
    }

    protected function extractId(string $url): string
    {
        $path = parse_url($url, PHP_URL_PATH);
        $path = trim(preg_replace('/\s+/', '/', $path), '/');

        $segments = array_values(array_filter(explode('/', $path)));

        if (count($segments) === 1) {
            return $segments[0];
        }

        if (count($segments) >= 2) {
            return $segments[1];
        }

        throw new InvalidArgumentException('URL inválida: no se pudo extraer el ID.');
    }

    public function rules(): array
    {
        return [
            'code' => [
                'required',
                'string',
                'max:512',
                Rule::unique('players')->where(
                    fn($query) =>
                    $query->where('server_id', $this->server_id)
                ),
            ],
            'code_backup' => ['nullable', 'string', 'max:1024'],
            'server_id' => ['required', 'exists:servers,id'],
            'episode_id' => ['required', 'exists:episodes,id'],
            'languaje' => ['required', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'code.unique' => __('players.validation.code.unique'),
            'server_id.required' => __('players.validation.server_id.required'),
            'server_id.exists' => __('players.validation.server_id.exists'),
            'episode_id.required' => __('players.validation.episode_id.required'),
            'episode_id.exists' => __('players.validation.episode_id.exists'),
            'languaje.required' => __('players.validation.languaje.required'),
            'languaje.integer' => __('players.validation.languaje.integer'),
        ];
    }
}
