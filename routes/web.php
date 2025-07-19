<?php

use App\Http\Controllers\Animes\AnimeController;
use App\Http\Controllers\CacheController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Episodes\EpisodeController;
use App\Http\Controllers\Genres\GenreController;
use App\Http\Controllers\Players\PlayerController;
use App\Http\Controllers\Servers\ServerController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    syncLangFiles(['welcome']);
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    Route::resource('genres', GenreController::class)->only(['index', 'store', 'update', 'destroy'])->names('genres');
    Route::resource('animes', AnimeController::class);
    Route::resource('servers', ServerController::class)->names('servers')->only(['index', 'store', 'update', 'destroy']);

    Route::post('animes/{anime}/episodes/generate-players', [EpisodeController::class, 'generatePlayers'])->name('episodes.generate-players');
    Route::resource('animes.episodes', EpisodeController::class)->names('episodes')->only(['index', 'store', 'update', 'destroy']);
    Route::resource('animes.episodes.players', PlayerController::class)->names('players')->only(['index', 'store', 'update', 'destroy']);

    Route::put('users/{user}/toggle-premium', [UserController::class, 'togglePremium'])->name('users.toggle-premium');
    Route::put('users/{user}/update-password', [UserController::class, 'updatePassword'])->name('users.update-password');
    Route::put('users/{user}/update-email', [UserController::class, 'updateEmail'])->name('users.update-email');
    Route::resource('users', UserController::class);


    Route::post('/cache/genres/clear', [CacheController::class, 'clearGenreCache'])->name('cache.genres.clear');
    Route::post('/cache/servers/clear', [CacheController::class, 'clearServerCache'])->name('cache.servers.clear');
    Route::post('/cache/animes/clear', [CacheController::class, 'clearAnimeCache'])->name('cache.animes.clear');
    Route::post('/cache/animes/{anime}/episodes/clear', [CacheController::class, 'clearEpisodeCache'])
        ->name('cache.episodes.clear');
    Route::post('/cache/animes/{anime}/episodes/{episode}/players/clear', [CacheController::class, 'clearPlayerCache'])->name('cache.players.clear');
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
