<?php

use App\Http\Controllers\Animes\AnimeController;
use App\Http\Controllers\Genres\GenreController;
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
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
