<?php

namespace App\Http\Controllers\Genres;

use App\Http\Controllers\Controller;
use App\Http\Requests\Genres\StoreGenreRequest;
use App\Http\Requests\Genres\UpdateGenreRequest;
use App\Models\Genre;
use App\Services\GenreService;
use Inertia\Inertia;

class GenreController extends Controller
{
    protected $genreService;

    public function __construct(GenreService $genreService)
    {
        $this->genreService = $genreService;
        syncLangFiles(['genres']);
    }

    public function index()
    {
        return Inertia::render('Genres/Index', [
            'genres' => $this->genreService->getAll(),
        ]);
    }

    public function store(StoreGenreRequest $request)
    {
        $this->genreService->create($request->validated());
        return to_route('genres.index');
    }

    public function update(UpdateGenreRequest $request, Genre $genre)
    {
        $this->genreService->update($genre, $request->validated());
        return to_route('genres.index');
    }

    public function destroy(Genre $genre)
    {
        $this->genreService->delete($genre);
        return to_route('genres.index');
    }
}
