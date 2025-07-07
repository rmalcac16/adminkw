<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Http\RedirectResponse;

class CacheController extends Controller
{
    public function clearGenreCache(): RedirectResponse
    {
        Cache::forget('genres.all');

        return redirect()->back()->with('message', 'Caché de géneros limpiada correctamente.');
    }
}
