<?php

use App\Http\Controllers\Api\MalApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('mal')->group(function () {
    Route::get('search', [MalApiController::class, 'search'])->name('mal.search'); // /api/mal/search?query=Naruto
    Route::get('anime/{id}', [MalApiController::class, 'show'])->name('mal.show'); // /api/mal/anime/1
});
