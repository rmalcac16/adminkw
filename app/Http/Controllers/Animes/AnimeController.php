<?php

namespace App\Http\Controllers\Animes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Animes\StoreAnimeRequest;
use App\Http\Requests\Animes\UpdateAnimeRequest;
use App\Models\Anime;
use App\Services\AnimeService;
use App\Services\GenreService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimeController extends Controller
{

    protected $animeService, $genreService;

    public function __construct(AnimeService $service, GenreService $genreService)
    {
        $this->animeService = $service;
        $this->genreService = $genreService;
        syncLangFiles(['animes']);
    }

    public function index(Request $request, AnimeService $animeService)
    {
        $filters = $request->only(['search', 'perPage', 'status', 'type']);
        $perPage = (int) ($filters['perPage'] ?? 10);

        return inertia('Animes/Index', [
            'animes' => $animeService->paginate($filters, $perPage),
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        $genres = $this->genreService->getAll();
        return Inertia::render('Animes/Create', [
            'genres' => $genres,
        ]);
    }

    public function edit(Anime $anime)
    {
        $anime = $this->animeService->find($anime);
        $genres = $this->genreService->getAll();
        return Inertia::render('Animes/Edit', [
            'genres' => $genres,
            'anime' => $anime,
        ]);
    }

    public function store(StoreAnimeRequest $request)
    {
        $this->animeService->create($request->validated());
        return to_route('animes.index')->with('success', __('animes.messages.created', ['name' => $request->name]));
    }

    public function update(UpdateAnimeRequest $request, Anime $anime)
    {
        $this->animeService->update($anime, $request->validated());
        return to_route('animes.index')->with('success', __('animes.messages.updated', ['name' => $anime->name]));
    }

    public function destroy(Anime $anime)
    {
        $this->animeService->delete($anime);
        return to_route('animes.index')->with('success', __('animes.messages.deleted', ['name' => $anime->name]));
    }
}
