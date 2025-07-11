<?php

namespace App\Services;

use App\Models\Anime;
use App\Models\Episode;
use App\Models\Player;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class PlayerService
{
    protected string $cacheTag = 'players';

    protected function supportsTags(): bool
    {
        return in_array(config('cache.default'), ['redis', 'memcached']);
    }

    protected function getCacheKey(Anime $anime, Episode $episode): string
    {
        return "players.episodes.{$episode->id}.animes.{$anime->id}";
    }

    public function getAll(Anime $anime, Episode $episode): Collection
    {
        $key = $this->getCacheKey($anime, $episode);

        if ($this->supportsTags()) {
            return Cache::tags($this->cacheTag)->rememberForever($key, function () use ($episode) {
                return $episode->players()
                    ->orderBy('languaje')
                    ->orderBy('id', 'desc')
                    ->with(['server', 'episode'])
                    ->get();
            });
        }

        return Cache::rememberForever($key, function () use ($episode) {
            return $episode->players()
                ->orderBy('languaje')
                ->orderBy('id', 'desc')
                ->with(['server', 'episode'])
                ->get();
        });
    }


    public function create(Anime $anime, Episode $episode, array $data): ?Player
    {
        $player = $episode->players()->create($data);
        $this->flushEpisodeCache($anime, $episode);
        return $player;
    }

    public function update(Anime $anime, Episode $episode, Player $player, array $data): ?Player
    {
        $player->update($data);
        $this->flushEpisodeCache($anime, $episode);
        return $player;
    }

    public function delete(Anime $anime, Episode $episode, Player $player): bool
    {
        $deleted = $player->delete();
        if ($deleted) {
            $this->flushEpisodeCache($anime, $episode);
        }
        return $deleted;
    }

    protected function flushEpisodeCache(Anime $anime, Episode $episode): void
    {
        $cacheKey = "players.episodes.{$episode->id}.animes.{$anime->id}";

        if ($this->supportsTags()) {
            Cache::tags($this->cacheTag)->forget($cacheKey);
        } else {
            Cache::forget($cacheKey);
        }
    }
}
