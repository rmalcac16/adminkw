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
                        ->where('server_id', $this->server_id);
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
            ],
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
