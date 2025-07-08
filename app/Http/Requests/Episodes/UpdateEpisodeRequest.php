<?php

namespace App\Http\Requests\Episodes;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEpisodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $anime = $this->route('anime');
        $episode = $this->route('episode');
        return [
            'number' => ['required', 'integer', 'min:1', 'unique:episodes,number,' . $episode->id . ',id,anime_id,' . $anime->id],
        ];
    }
}
