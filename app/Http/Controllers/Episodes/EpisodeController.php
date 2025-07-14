<?php

namespace App\Http\Controllers\Episodes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Episodes\StoreEpisodeRequest;
use App\Http\Requests\Episodes\UpdateEpisodeRequest;
use App\Models\Anime;
use App\Models\Episode;
use App\Services\EpisodeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EpisodeController extends Controller
{

    protected EpisodeService $episodeService;

    public function __construct(EpisodeService $episodeService)
    {
        $this->episodeService = $episodeService;
        syncLangFiles(['episodes']);
    }

    public function index(Anime $anime)
    {
        $episodes = $this->episodeService->getAll($anime);

        return Inertia::render('Episodes/Index', [
            'anime' => $anime,
            'episodes' => $episodes,
        ]);
    }

    public function store(StoreEpisodeRequest $request, Anime $anime)
    {
        $validatedData = $request->validated();
        $createdEpisode = $this->episodeService->create($anime, $validatedData);
        return back()->with('success', __('episodes.messages.created', ['number' => $createdEpisode->number]));
    }


    public function update(UpdateEpisodeRequest $request, Anime $anime, Episode $episode)
    {
        $validatedData = $request->validated();
        $updatedEpisode = $this->episodeService->update($anime, $episode, $validatedData);
        return back()->with('success', __('episodes.messages.updated', ['number' => $updatedEpisode->number]));
    }

    public function destroy(Anime $anime, Episode $episode)
    {
        $this->episodeService->delete($anime, $episode);
        return back()->with('success', __('episodes.messages.deleted', ['number' => $episode->number]));
    }
}
