<?php

use App\Http\Controllers\Animes\AnimeController;
use App\Http\Controllers\CacheController;
use App\Http\Controllers\Episodes\EpisodeController;
use App\Http\Controllers\Genres\GenreController;
use App\Http\Controllers\Servers\ServerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    syncLangFiles(['welcome']);
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('genres', GenreController::class);
    Route::resource('animes', AnimeController::class);
    Route::resource('servers', ServerController::class)->names('servers');

    Route::resource('animes.episodes', EpisodeController::class)->names('episodes');

    Route::post('/cache/genres/clear', [CacheController::class, 'clearGenreCache'])->name('cache.genres.clear');
    Route::post('/cache/servers/clear', [CacheController::class, 'clearServerCache'])->name('cache.servers.clear');
    Route::post('/cache/animes/clear', [CacheController::class, 'clearAnimeCache'])->name('cache.animes.clear');
    Route::post('/cache/animes/{anime}/episodes/clear', [CacheController::class, 'clearEpisodeCache'])
        ->name('cache.episodes.clear');
});






require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
