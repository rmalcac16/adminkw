<?php

namespace App\Services;

use App\Models\Anime;
use App\Models\Episode;
use App\Models\Server;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use InvalidArgumentException;

class EpisodeService
{
    protected string $cacheTag = 'episodes';

    protected PlayerService $playerService;

    public function __construct(PlayerService $playerService)
    {
        $this->playerService = $playerService;
    }

    protected function supportsTags(): bool
    {
        return in_array(config('cache.default'), ['redis', 'memcached']);
    }

    protected function getCacheKey(Anime $anime): string
    {
        return "episodes.anime.{$anime->id}";
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

    public function getAll(Anime $anime): Collection
    {
        $key = $this->getCacheKey($anime);

        $query = fn() => $anime->episodes()->orderBy('number', 'desc')->get();

        return $this->supportsTags()
            ? Cache::tags([$this->cacheTag])->rememberForever($key, $query)
            : Cache::rememberForever($key, $query);
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

    public function generatePlayers(array $data, Anime $anime): void
    {
        $links = preg_split('/\r\n|\r|\n/', trim($data['links']));
        $episodeNumber = (int) $data['episode_initial'];
        $serverId = $data['server_id'];
        $language = $data['language'];
        $domains = Server::find($serverId)?->domains ?? [];

        foreach ($links as $link) {
            if (empty(trim($link))) continue;

            $episode = $anime->episodes()->where('number', $episodeNumber)->first();

            if (!$episode) {
                $episode = $anime->episodes()->create(['number' => $episodeNumber]);
                $this->flushCache($anime);
            }

            $code = $this->extractId($link);

            $this->playerService->createOrUpdate($anime, $episode, [
                'server_id' => $serverId,
                'languaje' => $language,
                'code' => $code,
                'code_backup' => $link,
            ]);

            $episodeNumber++;
        }
    }

    protected function extractId(string $url): string
    {
        $path = parse_url($url, PHP_URL_PATH);
        $path = trim(preg_replace('/\s+/', '/', $path), '/');

        $segments = array_values(array_filter(explode('/', $path)));

        if (count($segments) === 1) {
            return $segments[0];
        }

        if (count($segments) >= 2) {
            return $segments[1];
        }

        throw new InvalidArgumentException('URL inválida: no se pudo extraer el ID.');
    }
}
