<?php

namespace App\Services;

use App\Models\Anime;
use App\Models\Episode;
use App\Models\Player;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Throwable;

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

    protected function flushPlayerCache(Anime $anime, Episode $episode): void
    {
        $cacheKey = $this->getCacheKey($anime, $episode);

        if ($this->supportsTags()) {
            Cache::tags($this->cacheTag)->forget($cacheKey);
        } else {
            Cache::forget($cacheKey);
        }
    }

    public function getAll(Anime $anime, Episode $episode): Collection
    {
        $key = $this->getCacheKey($anime, $episode);

        $query = fn() => Player::where('episode_id', $episode->id)
            ->orderBy('languaje')
            ->orderByDesc('id')
            ->with(['server', 'episode'])
            ->get();

        return $this->supportsTags()
            ? Cache::tags($this->cacheTag)->rememberForever($key, $query)
            : Cache::rememberForever($key, $query);
    }

    public function create(Anime $anime, Episode $episode, array $data): ?Player
    {
        $data['created_at'] = now();
        $data['updated_at'] = '2021-01-01 00:00:00';
        $player = $episode->players()->make($data);
        $player->timestamps = false;
        $player->save();
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

    public function createOrUpdate(Anime $anime, Episode $episode, array $data): Player
    {
        $player = $episode->players()
            ->where('server_id', $data['server_id'])
            ->where('languaje', $data['languaje'])
            ->first();

        if ($player) {
            $player = $this->update($anime, $episode, $player, $data);
        } else {
            $player = $this->create($anime, $episode, $data);
        }
        return $player;
    }

    /**
     * Crear o actualizar múltiples players.
     *
     * @param Anime   $anime
     * @param Episode $episode
     * @param array   $data
     * @return array|null
     */
    public function createMultiple(Anime $anime, Episode $episode, array $data): ?array
    {
        if (empty($data['players']) || !is_array($data['players'])) {
            return null;
        }

        $created = [];

        DB::beginTransaction();
        try {
            foreach ($data['players'] as $playerData) {
                if (empty($playerData['code'])) {
                    continue;
                }
                $created[] = $this->createOrUpdate($anime, $episode, $playerData);
            }

            DB::commit();

            $this->flushPlayerCache($anime, $episode);

            return $created;
        } catch (Throwable $e) {
            DB::rollBack();
            report($e);
            return null;
        }
    }
}
