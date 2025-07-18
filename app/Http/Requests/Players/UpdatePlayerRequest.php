<?php

namespace App\Http\Requests\Players;

use App\Models\Server;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePlayerRequest extends FormRequest
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
                    'code_backup' => $original,
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
            $pattern = "~(?:https?://)?(?:www\.)?{$escapedDomain}/(?:[a-z]/)?([^/?&#\.]+)~i";

            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }

        $path = parse_url($url, PHP_URL_PATH);
        $segments = array_filter(explode('/', $path));

        if (!empty($segments)) {
            $last = end($segments);
            if (preg_match('/\.[a-zA-Z0-9]+$/', $last) && count($segments) > 1) {
                $last = prev($segments);
            }
            return $last;
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
                Rule::unique('players')
                    ->where(fn($query) => $query->where('server_id', $this->server_id))
                    ->ignore($this->route('player')), // Ignorar el actual
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
