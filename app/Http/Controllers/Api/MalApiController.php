<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MyAnimeListService;
use Illuminate\Http\Request;

class MalApiController extends Controller
{
    protected MyAnimeListService $mal;

    public function __construct(MyAnimeListService $mal)
    {
        $this->mal = $mal;
    }

    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2',
        ]);

        try {
            $results = $this->mal->searchAnime($request->q);
            return response()->json($results);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al consultar MyAnimeList: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $anime = $this->mal->getAnimeById((int) $id);
            return response()->json($anime);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener anime: ' . $e->getMessage()], 500);
        }
    }
}
