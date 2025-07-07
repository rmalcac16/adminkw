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
            'title' => 'required|string|max:255|unique:genres,title',
            'name_mal' => 'nullable|string|max:255|unique:genres,name_mal',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => __('genres.title_required'),
            'title.unique' => __('genres.title_unique'),
            'title.max' => __('genres.title_max'),
            'name_mal.unique' => __('genres.name_mal_unique'),
            'name_mal.max' => __('genres.name_mal_max'),
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $slug = Str::slug($this->input('title'));

            if (Genre::where('slug', $slug)->exists()) {
                $validator->errors()->add('title', __('genres.title_unique'));
            }
        });
    }
}
