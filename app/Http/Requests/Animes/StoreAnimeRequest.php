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
            'broadcast' => 'nullable|string|size:1',
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
            'short_name' => 'nullable|string|max:255|unique:animes,short_name',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => __('animes.validation.name.required'),
            'name.string' => __('animes.validation.name.string'),
            'name.max' => __('animes.validation.name.max'),

            'name_alternative.string' => __('animes.validation.name_alternative.string'),
            'name_alternative.max' => __('animes.validation.name_alternative.max'),

            'slug.string' => __('animes.validation.slug.string'),
            'slug.max' => __('animes.validation.slug.max'),

            'banner.string' => __('animes.validation.banner.string'),
            'banner.max' => __('animes.validation.banner.max'),

            'poster.string' => __('animes.validation.poster.string'),
            'poster.max' => __('animes.validation.poster.max'),

            'overview.string' => __('animes.validation.overview.string'),

            'aired.date' => __('animes.validation.aired.date'),

            'type.string' => __('animes.validation.type.string'),
            'type.in' => __('animes.validation.type.in'),

            'status.integer' => __('animes.validation.status.integer'),
            'status.in' => __('animes.validation.status.in'),

            'premiered.string' => __('animes.validation.premiered.string'),
            'premiered.max' => __('animes.validation.premiered.max'),

            'broadcast.string' => __('animes.validation.broadcast.string'),
            'broadcast.size' => __('animes.validation.broadcast.size'),

            'genres.string' => __('animes.validation.genres.string'),
            'genres.max' => __('animes.validation.genres.max'),

            'rating.string' => __('animes.validation.rating.string'),
            'rating.max' => __('animes.validation.rating.max'),

            'popularity.integer' => __('animes.validation.popularity.integer'),
            'popularity.min' => __('animes.validation.popularity.min'),

            'trailer.url' => __('animes.validation.trailer.url'),
            'trailer.max' => __('animes.validation.trailer.max'),

            'vote_average.numeric' => __('animes.validation.vote_average.numeric'),
            'vote_average.min' => __('animes.validation.vote_average.min'),
            'vote_average.max' => __('animes.validation.vote_average.max'),

            'prequel.exists' => __('animes.validation.prequel.exists'),
            'sequel.exists' => __('animes.validation.sequel.exists'),

            'related.string' => __('animes.validation.related.string'),
            'related.max' => __('animes.validation.related.max'),

            'views.integer' => __('animes.validation.views.integer'),
            'views.min' => __('animes.validation.views.min'),

            'views_app.integer' => __('animes.validation.views_app.integer'),
            'views_app.min' => __('animes.validation.views_app.min'),

            'isTopic.boolean' => __('animes.validation.isTopic.boolean'),

            'mal_id.integer' => __('animes.validation.mal_id.integer'),
            'mal_id.min' => __('animes.validation.mal_id.min'),

            'tmdb_id.integer' => __('animes.validation.tmdb_id.integer'),
            'tmdb_id.min' => __('animes.validation.tmdb_id.min'),

            'short_name.string' => __('animes.validation.short_name.string'),
            'short_name.max' => __('animes.validation.short_name.max'),
            'short_name.unique' => __('animes.validation.short_name.unique'),
        ];
    }
}
