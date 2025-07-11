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
                'max:10000',
                Rule::unique('episodes', 'number')
                    ->where('anime_id', $anime->id)
                    ->ignore($episode->id),
            ],
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        $firstError = collect($validator->errors()->messages())->flatten()->first();
        throw new HttpResponseException(
            redirect()->back()
                ->withErrors($validator)
                ->withInput()
                ->with('error', $firstError)
        );
    }
}
