<?php

namespace App\Services;

use App\Models\Genre;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class GenreService
{
    public static function getAll(): Collection
    {
        return Cache::rememberForever('genres.all', function () {
            return Genre::orderByRaw('LOWER(name)')->get();
        });
    }

    public function create(array $data): ?Genre
    {
        $data['slug'] = Str::slug($data['name']);
        $genre = Genre::create($data);
        Cache::forget('genres.all');
        return $genre;
    }

    public function update(Genre $genre, array $data): ?Genre
    {
        $data['slug'] = Str::slug($data['name']);
        $genre->update($data);
        Cache::forget('genres.all');
        return $genre;
    }

    public function delete(Genre $genre): bool
    {
        $deleted = $genre->delete();
        if ($deleted) {
            Cache::forget('genres.all');
        }
        return $deleted;
    }
}
