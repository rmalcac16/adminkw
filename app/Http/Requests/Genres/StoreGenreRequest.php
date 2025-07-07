<?php

namespace App\Http\Requests\Genres;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use App\Models\Genre;

class StoreGenreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:genres,name',
            'name_mal' => 'nullable|string|max:255|unique:genres,name_mal',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => __('genres.name_required'),
            'name.unique' => __('genres.name_unique'),
            'name.max' => __('genres.name_max'),
            'name_mal.unique' => __('genres.name_mal_unique'),
            'name_mal.max' => __('genres.name_mal_max'),
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $slug = Str::slug($this->input('name'));

            if (Genre::where('slug', $slug)->exists()) {
                $validator->errors()->add('name', __('genres.name_unique'));
            }
        });
    }
}
