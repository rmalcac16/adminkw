<?php

namespace App\Services;

use App\Models\Anime;
use App\Models\Episode;
use App\Models\Genre;
use App\Models\Server;
use App\Models\User;
use App\Services\UserService;

use Illuminate\Support\Facades\Cache;

class DashboardService
{

    public function getStats(): array
    {
        return Cache::remember('dashboard_stats', now()->addMinutes(5), function () {
            $now = now();
            $startOfMonth = $now->copy()->startOfMonth();
            $endOfMonth = $now->copy()->endOfMonth();

            $totalAnimes = Anime::count();

            $animesLastMonth = Anime::whereBetween('created_at', [
                $startOfMonth->copy()->subMonth(),
                $endOfMonth->copy()->subMonth()
            ])->count();

            $animesThisMonth = Anime::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

            $animeGrowth = $animesLastMonth > 0
                ? (($animesThisMonth - $animesLastMonth) / $animesLastMonth) * 100
                : 0;

            return [
                'totalAnimes' => [
                    'value' => $totalAnimes,
                    'growth' => round($animeGrowth, 1),
                ],
                'totalEpisodes' => Episode::count(),
                'totalUsers' => User::count(),
                'activeUsers' => User::where('isPremium', true)->count(),
                'genres' => Genre::count(),
                'servers' => Server::count(),
            ];
        });
    }
}
