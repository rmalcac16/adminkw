<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\RedirectResponse;

class CacheController extends Controller
{
    public function clearGenreCache(): RedirectResponse
    {
        Cache::tags(['genres'])->flush();
        Cache::forget('genres.all');
        return redirect()->back();
    }


    public function clearServerCache(): RedirectResponse
    {
        Cache::tags(['servers'])->flush();
        Cache::forget('servers.all');
        return redirect()->back();
    }

    public function clearAnimeCache(): RedirectResponse
    {
        Cache::tags(['animes'])->flush();
        Cache::forget('animes.all');
        return redirect()->back();
    }

    public function clearEpisodeCache(Anime $anime): RedirectResponse
    {
        $cacheKey = "episodes.anime.{$anime->id}";

        if (in_array(config('cache.default'), ['redis', 'memcached'])) {
            Cache::tags(['episodes'])->forget($cacheKey);
        } else {
            Cache::forget($cacheKey);
        }

        return redirect()->back();
    }
}
