<?php

namespace App\Services;

use App\Models\Anime;
use App\Models\Episode;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class EpisodeService
{
    protected string $cacheTag = 'episodes';

    protected function supportsTags(): bool
    {
        return in_array(config('cache.default'), ['redis', 'memcached']);
    }

    protected function getCacheKey(Anime $anime): string
    {
        return "episodes.anime.{$anime->id}";
    }

    public function getAll(Anime $anime): Collection
    {
        $key = $this->getCacheKey($anime);

        if ($this->supportsTags()) {
            return Cache::tags([$this->cacheTag])->rememberForever(
                $key,
                fn() => $anime->episodes()->orderBy('number', 'desc')->get()
            );
        }

        return Cache::rememberForever(
            $key,
            fn() => $anime->episodes()->orderBy('number', 'desc')->get()
        );
    }

    public function create(Anime $anime, array $data): Episode
    {
        $episode = $anime->episodes()->create($data);
        $this->flushCache($anime);
        return $episode;
    }

    public function update(Anime $anime, Episode $episode, array $data): Episode
    {
        $anime->episodes()->findOrFail($episode->id);
        $episode->update($data);
        $this->flushCache($anime);
        return $episode;
    }

    public function delete(Anime $anime, Episode $episode): bool
    {
        $anime->episodes()->findOrFail($episode->id);
        $deleted = $episode->delete();
        if ($deleted) {
            $this->flushCache($anime);
        }
        return $deleted;
    }

    protected function flushCache(Anime $anime): void
    {
        $key = $this->getCacheKey($anime);

        if ($this->supportsTags()) {
            Cache::tags([$this->cacheTag])->forget($key);
        } else {
            Cache::forget($key);
        }
    }
}
