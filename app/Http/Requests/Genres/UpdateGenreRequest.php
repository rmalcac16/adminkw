<?php

namespace App\Http\Requests\Genres;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use App\Models\Genre;

class UpdateGenreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $genre = $this->route('genre');

        return [
            'title' => 'required|string|max:255|unique:genres,title,' . $genre->id,
            'name_mal' => 'nullable|string|unique:genres,name_mal,' . $genre->id,
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
            'name_mal.string' => __('genres.name_mal_string'),
            'name_mal.nullable' => __('genres.name_mal_nullable'),
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $genre = $this->route('genre');
            $slug = Str::slug($this->input('title'));

            $slugExists = Genre::where('slug', $slug)
                ->where('id', '!=', $genre->id)
                ->exists();

            if ($slugExists) {
                $validator->errors()->add('title', __('genres.title_unique'));
            }
        });
    }
}
