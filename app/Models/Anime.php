<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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

    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            0 => 'Finalizado',
            1 => 'En emisión',
            2 => 'En pausa',
            3 => 'Próximamente',
            default => 'Desconocido',
        };
    }
}
