<?php

namespace App\Http\Requests\Animes;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnimeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'name_alternative' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255',
            'banner' => 'nullable|string|max:255',
            'poster' => 'nullable|string|max:255',
            'overview' => 'nullable|string',
            'aired' => 'nullable|date',
            'type' => 'nullable|string|in:TV,Movie,OVA,ONA,Special',
            'status' => 'nullable|integer|in:0,1,2,3,4',
            'premiered' => 'nullable|string|max:255',
            'broadcast' => 'nullable|integer|between:1,7',
            'genres' => 'nullable|string|max:255',
            'rating' => 'nullable|string|max:50',
            'popularity' => 'nullable|integer|min:0',
            'trailer' => 'nullable|url|max:255',
            'vote_average' => 'nullable|numeric|min:0|max:10',
            'prequel' => 'nullable|exists:animes,id',
            'sequel' => 'nullable|exists:animes,id',
            'related' => 'nullable|string|max:255',
            'views' => 'nullable|integer|min:0',
            'views_app' => 'nullable|integer|min:0',
            'isTopic' => 'nullable|boolean',
            'mal_id' => 'nullable|integer|min:0',
            'tmdb_id' => 'nullable|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del anime es obligatorio.',
            'name.max' => 'El nombre no debe superar los 255 caracteres.',

            'name_alternative.max' => 'El nombre alternativo no debe superar los 255 caracteres.',
            'banner.max' => 'La URL del banner no debe superar los 255 caracteres.',
            'poster.max' => 'La URL del póster no debe superar los 255 caracteres.',

            'aired.date' => 'La fecha de emisión debe ser una fecha válida.',
            'type.in' => 'El tipo de anime debe ser uno de los siguientes: TV, Movie, OVA, ONA, Special',
            'status.in' => 'El estado no es válido.',
            'broadcast.between' => 'El campo broadcast debe ser un número entre 1 y 7.',

            'genres.max' => 'Los géneros no deben superar los 255 caracteres.',
            'rating.max' => 'La clasificación no debe superar los 50 caracteres.',

            'popularity.integer' => 'La popularidad debe ser un número entero.',
            'popularity.min' => 'La popularidad no puede ser negativa.',

            'trailer.url' => 'La URL del tráiler no es válida.',
            'trailer.max' => 'La URL del tráiler no debe superar los 255 caracteres.',

            'vote_average.numeric' => 'El promedio de votos debe ser un número.',
            'vote_average.min' => 'El promedio de votos no puede ser menor que 0.',
            'vote_average.max' => 'El promedio de votos no puede ser mayor que 10.',

            'prequel.exists' => 'El anime prequel seleccionado no existe.',
            'sequel.exists' => 'El anime secuela seleccionado no existe.',

            'related.max' => 'El campo de animes relacionados no debe superar los 255 caracteres.',
            'views.integer' => 'Las vistas deben ser un número entero.',
            'views.min' => 'Las vistas no pueden ser negativas.',

            'views_app.integer' => 'Las vistas en app deben ser un número entero.',
            'views_app.min' => 'Las vistas en app no pueden ser negativas.',

            'isTopic.boolean' => 'El campo de "tema destacado" debe ser verdadero o falso.',
            'mal_id.integer' => 'El ID de MyAnimeList debe ser un número entero.',
            'tmdb_id.integer' => 'El ID de TMDB debe ser un número entero.',
        ];
    }
}
