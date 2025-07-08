<?php

namespace App\Services;

use App\Models\Server;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class ServerService
{
    protected string $cacheKey = 'servers.all';
    protected string $cacheTag = 'servers';

    protected function supportsTags(): bool
    {
        return in_array(config('cache.default'), ['redis', 'memcached']);
    }

    public function getAll(): Collection
    {
        if ($this->supportsTags()) {
            return Cache::tags($this->cacheTag)->rememberForever($this->cacheKey, function () {
                return Server::orderBy('id', 'desc')->get();
            });
        }

        return Cache::rememberForever($this->cacheKey, function () {
            return Server::orderBy('id', 'desc')->get();
        });
    }

    public function create(array $data): ?Server
    {
        $server = Server::create($data);
        $this->flushCache();
        return $server;
    }

    public function update(Server $server, array $data): ?Server
    {
        $server->update($data);
        $this->flushCache();
        return $server;
    }

    public function delete(Server $server): bool
    {
        $deleted = $server->delete();
        if ($deleted) {
            $this->flushCache();
        }
        return $deleted;
    }

    protected function flushCache(): void
    {
        if ($this->supportsTags()) {
            Cache::tags($this->cacheTag)->forget($this->cacheKey);
        } else {
            Cache::forget($this->cacheKey);
        }
    }
}
