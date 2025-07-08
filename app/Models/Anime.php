<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Anime extends Model
{
    protected $fillable = [
        'name',
        'name_alternative',
        'slug',
        'banner',
        'poster',
        'overview',
        'aired',
        'type',
        'status',
        'premiered',
        'broadcast',
        'genres',
        'rating',
        'popularity',
        'trailer',
        'vote_average',
        'prequel',
        'sequel',
        'related',
        'views',
        'views_app',
        'isTopic',
        'mal_id',
        'tmdb_id',
    ];

    public function episodes(): HasMany
    {
        return $this->hasMany(Episode::class);
    }
}
