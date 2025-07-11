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
                $original = $this->input('code');
                $cleaned = $this->extractIdFromDomains($original, $server->domains);

                $this->merge([
                    'code' => $cleaned,
                ]);
            }
        }
    }

    protected function extractIdFromDomains(string $url, array $domains): string
    {
        foreach ($domains as $domain) {
            $domain = trim($domain);
            if ($domain === '') continue;

            $escapedDomain = preg_quote($domain, '~');
            $pattern = "~(?:https?://)?(?:www\.)?{$escapedDomain}/(?:[a-z]/)?([^/?&]+)~i";

            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }

        if (preg_match('~/([^/]+)$~', $url, $matches)) {
            return $matches[1];
        }

        return $url;
    }

    public function rules(): array
    {
        return [
            'code' => [
                'required',
                'string',
                'max:512',
                Rule::unique('players')->where(function ($query) {
                    return $query->where('episode_id', $this->episode_id)
                        ->where('server_id', $this->server_id)
                        ->where('languaje', $this->languaje);
                }),
            ],
            'server_id' => [
                'required',
                'exists:servers,id',
            ],
            'episode_id' => [
                'required',
                'exists:episodes,id',
            ],
            'languaje' => [
                'required',
                'integer',
                // Eliminamos la regla unique aquí para permitir diferentes lenguajes
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'code.unique' => 'players.validation.code.unique',
            'server_id.required' => 'players.validation.server_id.required',
            'server_id.exists' => 'players.validation.server_id.exists',
            'episode_id.required' => 'players.validation.episode_id.required',
            'episode_id.exists' => 'players.validation.episode_id.exists',
            'languaje.required' => 'players.validation.languaje.required',
            'languaje.integer' => 'players.validation.languaje.integer',
        ];
    }

    public function attributes()
    {
        return [
            'languaje' => 'idioma',
        ];
    }
}
