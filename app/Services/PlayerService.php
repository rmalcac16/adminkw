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

        $query = fn() => Player::where('episode_id', $episode->id)
            ->orderBy('languaje')
            ->orderByDesc('id')
            ->with(['server', 'episode'])
            ->get();

        if ($this->supportsTags()) {
            return Cache::tags($this->cacheTag)->rememberForever($key, $query);
        }

        return Cache::rememberForever($key, $query);
    }

    public function create(Anime $anime, Episode $episode, array $data): ?Player
    {
        $player = $episode->players()->create($data);
        $this->flushPlayerCache($anime, $episode);
        return $player;
    }

    public function update(Anime $anime, Episode $episode, Player $player, array $data): ?Player
    {
        $player->update($data);
        $this->flushPlayerCache($anime, $episode);
        return $player;
    }

    public function delete(Anime $anime, Episode $episode, Player $player): bool
    {
        $deleted = $player->delete();

        if ($deleted) {
            $this->flushPlayerCache($anime, $episode);
        }

        return $deleted;
    }

    protected function flushPlayerCache(Anime $anime, Episode $episode): void
    {
        $cacheKey = "players.episodes.{$episode->id}.animes.{$anime->id}";

        if ($this->supportsTags()) {
            Cache::tags($this->cacheTag)->forget($cacheKey);
        } else {
            Cache::forget($cacheKey);
        }
    }
}
