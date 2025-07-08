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
            'number' => ['required', 'integer', 'min:1', 'unique:episodes,number,NULL,id,anime_id,' . $anime->id],
        ];
    }
}
