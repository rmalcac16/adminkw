<?php

namespace App\Http\Requests\Animes;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnimeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:220',
            'name_alternative' => 'nullable|string|max:350',
            'slug' => 'nullable|string|max:220',
            'banner' => 'nullable|string|max:220',
            'poster' => 'nullable|string|max:220',
            'overview' => 'nullable|string',
            'aired' => 'nullable|date',
            'type' => 'nullable|string|in:TV,Movie,OVA,ONA,Special',
            'status' => 'nullable|integer|in:0,1,2,3,4',
            'premiered' => 'nullable|string|max:15',
            'broadcast' => 'nullable|string|size:1',
            'genres' => 'nullable|string|max:255',
            'rating' => 'nullable|string|max:150',
            'popularity' => 'nullable|integer|min:0',
            'trailer' => 'nullable|url|max:255',
            'vote_average' => 'nullable|numeric|min:0|max:10',
            'prequel' => 'nullable|exists:animes,id',
            'sequel' => 'nullable|exists:animes,id',
            'related' => 'nullable|string|max:150',
            'views' => 'nullable|integer|min:0',
            'views_app' => 'nullable|integer|min:0',
            'isTopic' => 'nullable|boolean',
            'mal_id' => 'nullable|integer|min:0',
            'tmdb_id' => 'nullable|integer|min:0',
            'short_name' => 'nullable|string|max:30|unique:animes,short_name',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del anime es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe superar los 220 caracteres.',

            'name_alternative.string' => 'El nombre alternativo debe ser una cadena de texto.',
            'name_alternative.max' => 'El nombre alternativo no debe superar los 350 caracteres.',

            'slug.string' => 'El slug debe ser una cadena de texto.',
            'slug.max' => 'El slug no debe superar los 220 caracteres.',

            'banner.string' => 'El banner debe ser una cadena de texto.',
            'banner.max' => 'El banner no debe superar los 220 caracteres.',

            'poster.string' => 'El póster debe ser una cadena de texto.',
            'poster.max' => 'El póster no debe superar los 220 caracteres.',

            'overview.string' => 'La sinopsis debe ser una cadena de texto.',

            'aired.date' => 'La fecha de emisión debe ser una fecha válida.',

            'type.string' => 'El tipo debe ser una cadena de texto.',
            'type.in' => 'El tipo seleccionado no es válido. Debe ser TV, Movie, OVA, ONA o Special.',

            'status.integer' => 'El estado debe ser un número entero.',
            'status.in' => 'El estado seleccionado no es válido.',

            'premiered.string' => 'La temporada debe ser una cadena de texto.',
            'premiered.max' => 'La temporada no debe superar los 15 caracteres.',

            'broadcast.string' => 'La emisión debe ser una cadena de texto.',
            'broadcast.size' => 'La emisión debe contener exactamente 1 carácter.',

            'genres.string' => 'Los géneros deben ser una cadena de texto.',
            'genres.max' => 'Los géneros no deben superar los 255 caracteres.',

            'rating.string' => 'La clasificación debe ser una cadena de texto.',
            'rating.max' => 'La clasificación no debe superar los 150 caracteres.',

            'popularity.integer' => 'La popularidad debe ser un número entero.',
            'popularity.min' => 'La popularidad no puede ser negativa.',

            'trailer.url' => 'El enlace del tráiler debe ser una URL válida.',
            'trailer.max' => 'El enlace del tráiler no debe superar los 255 caracteres.',

            'vote_average.numeric' => 'El puntaje debe ser un valor numérico.',
            'vote_average.min' => 'El puntaje no puede ser menor que 0.',
            'vote_average.max' => 'El puntaje no puede ser mayor que 10.',

            'prequel.exists' => 'El anime precuela seleccionado no existe.',
            'sequel.exists' => 'El anime secuela seleccionado no existe.',

            'related.string' => 'El campo relacionado debe ser una cadena de texto.',
            'related.max' => 'El campo relacionado no debe superar los 150 caracteres.',

            'views.integer' => 'Las vistas deben ser un número entero.',
            'views.min' => 'Las vistas no pueden ser negativas.',

            'views_app.integer' => 'Las vistas en la aplicación deben ser un número entero.',
            'views_app.min' => 'Las vistas en la aplicación no pueden ser negativas.',

            'isTopic.boolean' => 'El campo de tema debe ser verdadero o falso.',

            'mal_id.integer' => 'El ID de MyAnimeList debe ser un número entero.',
            'mal_id.min' => 'El ID de MyAnimeList no puede ser negativo.',

            'tmdb_id.integer' => 'El ID de TMDB debe ser un número entero.',
            'tmdb_id.min' => 'El ID de TMDB no puede ser negativo.',

            'short_name.string' => 'El nombre corto debe ser una cadena de texto.',
            'short_name.max' => 'El nombre corto no debe superar los 30 caracteres.',
            'short_name.unique' => 'El nombre corto ya está registrado.',
        ];
    }
}
