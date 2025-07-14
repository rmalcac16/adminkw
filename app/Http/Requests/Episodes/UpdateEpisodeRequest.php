<?php

namespace App\Http\Requests\Episodes;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;

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
            'number' => [
                'required',
                'integer',
                'min:1',
                Rule::unique('episodes', 'number')
                    ->where('anime_id', $anime->id)
                    ->ignore($episode->id),
            ],
        ];
    }


    public function messages(): array
    {
        return [
            'number.required' => __('episodes.validation.number_required'),
            'number.integer' => __('episodes.validation.number_integer'),
            'number.min' => __('episodes.validation.number_min', ['min' => 1]),
            'number.unique' => __('episodes.validation.number_unique'),
        ];
    }
}
