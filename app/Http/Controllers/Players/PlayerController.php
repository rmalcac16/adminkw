<?php

namespace App\Http\Controllers\Players;

use App\Http\Controllers\Controller;
use App\Http\Requests\Players\StoreMultiplePlayersRequest;
use App\Http\Requests\Players\StorePlayerRequest;
use App\Http\Requests\Players\UpdatePlayerRequest;
use App\Models\Anime;
use App\Models\Episode;
use App\Models\Player;
use App\Services\PlayerService;
use App\Services\ServerService;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    protected PlayerService $playerService;
    protected ServerService $serverService;

    public function __construct(PlayerService $playerService, ServerService $serverService)
    {
        $this->playerService = $playerService;
        $this->serverService = $serverService;
        syncLangFiles(['players']);
    }

    public function index(Anime $anime, Episode $episode)
    {
        $players = $this->playerService->getAll($anime, $episode);
        $servers = $this->serverService->getAll();
        return inertia('Players/Index', [
            'players' => $players,
            'episode' => $episode,
            'anime' => $anime,
            'servers' => $servers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlayerRequest $request, Anime $anime, Episode $episode)
    {
        $data = $request->validated();
        $player = $this->playerService->create($anime, $episode, $data);
        if ($player) {
            return redirect()->back()->with('success', __('players.store.success'));
        }
        return redirect()->back()->withErrors(__('players.store.error'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlayerRequest $request, Anime $anime, Episode $episode, Player $player)
    {
        $data = $request->validated();
        $updatedPlayer = $this->playerService->update($anime, $episode, $player, $data);
        if ($updatedPlayer) {
            return redirect()->back()->with('success', __('players.update.success'));
        }
        return redirect()->back()->withErrors(__('players.update.error'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anime $anime, Episode $episode, Player $player)
    {
        $deleted = $this->playerService->delete($anime, $episode, $player);
        if ($deleted) {
            return redirect()->back()->with('success', __('players.destroy.success'));
        }
        return redirect()->back()->withErrors(__('players.destroy.error'));
    }


    public function createMultiple(StoreMultiplePlayersRequest $request, Anime $anime, Episode $episode)
    {
        $data = $request->validated();
        $createdPlayers = $this->playerService->createMultiple($anime, $episode, $data);
        if ($createdPlayers) {
            return redirect()->back()->with('success', "Se han creado " . count($createdPlayers) . " reproductores exitosamente.");
        }
        return redirect()->back()->withErrors("Error al crear los reproductores.");
    }
}
