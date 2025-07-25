<?php

namespace App\Http\Controllers\Episodes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Episodes\StoreEpisodeRequest;
use App\Http\Requests\Episodes\UpdateEpisodeRequest;
use App\Http\Requests\Episodes\GenerateEpisodePlayersRequest;
use App\Http\Requests\Episodes\UploadEpisodeRequest;
use App\Models\Anime;
use App\Models\Episode;
use App\Services\EpisodeService;
use App\Services\ServerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EpisodeController extends Controller
{
    protected EpisodeService $episodeService;
    protected ServerService $serverService;

    public function __construct(EpisodeService $episodeService, ServerService $serverService)
    {
        $this->episodeService = $episodeService;
        $this->serverService = $serverService;
        syncLangFiles(['episodes']);
    }

    public function index(Anime $anime)
    {
        $episodes = $this->episodeService->getAll($anime);
        $servers = $this->serverService->getAll();

        return Inertia::render('Episodes/Index', [
            'anime' => $anime,
            'episodes' => $episodes,
            'servers' => $servers,
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


    public function generatePlayers(GenerateEpisodePlayersRequest $request, Anime $anime)
    {
        $validatedData = $request->validated();
        $this->episodeService->generatePlayers($validatedData, $anime);
        return back()->with('success', __('episodes.messages.players_generated'));
    }


    // Upload functionality
    public function upload(UploadEpisodeRequest $request, Anime $anime)
    {
        $validatedData = $request->validated();
        $this->episodeService->upload($anime, $validatedData);
        return back()->with('success', __('episodes.messages.uploaded'));
    }
}
