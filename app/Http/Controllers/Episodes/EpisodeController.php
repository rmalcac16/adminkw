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

        syncLangFiles('episodes');
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Anime $anime)
    {
        $episodes = $this->episodeService->getAll($anime);

        return Inertia::render('Episodes/Index', [
            'anime' => $anime,
            'episodes' => $episodes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEpisodeRequest $request, Anime $anime)
    {
        $validatedData = $request->validated();

        $this->episodeService->create($validatedData, $anime);

        return redirect()->route('episodes.index', ['anime' => $anime])
            ->with('success', __('episodes.store.success', ['number' => $validatedData['number']]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEpisodeRequest $request, Anime $anime, Episode $episode)
    {
        $validatedData = $request->validated();

        $this->episodeService->update($episode, $validatedData, $anime);

        return redirect()->route('episodes.index', ['anime' => $anime])
            ->with('success', __('episodes.update.success', ['number' => $episode->number]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anime $anime, Episode $episode)
    {
        $this->episodeService->delete($episode);

        return redirect()->route('episodes.index', ['anime' => $anime])
            ->with('success', __('episodes.destroy.success', ['number' => $episode->number]));
    }
}
