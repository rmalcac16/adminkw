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
            'name' => 'required|string|max:255|unique:genres,name,' . $genre->id,
            'name_mal' => 'nullable|string|unique:genres,name_mal,' . $genre->id,
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
            'name_mal.string' => __('genres.name_mal_string'),
            'name_mal.nullable' => __('genres.name_mal_nullable'),
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $genre = $this->route('genre');
            $slug = Str::slug($this->input('name'));

            $slugExists = Genre::where('slug', $slug)
                ->where('id', '!=', $genre->id)
                ->exists();

            if ($slugExists) {
                $validator->errors()->add('name', __('genres.name_unique'));
            }
        });
    }
}
