<?php

namespace App\Http\Controllers\Animes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Events\AnimeSyncProgress;
use Illuminate\Support\Facades\Http;
use App\Models\Anime;
use Inertia\Inertia;

class AnimeSyncController extends Controller
{


    public function index()
    {

        $animesCount = Anime::count();

        // Obtener animes sin mal_id
        $missingMalId = Anime::whereNull('mal_id')->pluck('name', 'id');

        return Inertia::render('Animes/Sync', [
            'animesCount'   => $animesCount,
            'missingMalId'  => $missingMalId, // enviamos a React
        ]);
    }

    public function run()
    {
        $limitDate = now()->subMonth();
        $animes = Anime::whereNotNull('mal_id')
            ->where(function ($q) use ($limitDate) {
                $q->whereNull('last_updated')
                    ->orWhere('last_updated', '<', $limitDate);
            })
            ->take(50)
            ->get();

        $total = $animes->count();
        broadcast(new AnimeSyncProgress("⚡ Iniciando sincronización de {$total} animes"));

        foreach ($animes as $i => $anime) {
            broadcast(new AnimeSyncProgress('(' . ($i + 1) . '/' . $total . ') 🎬 Anime ID ' . $anime->id . ': iniciando sync...'));

            try {
                $response = Http::retry(3, 500)->get("https://api.jikan.moe/v4/anime/{$anime->mal_id}");
                $data = $response->json('data');

                if ($data) {
                    $anime->update([
                        'synopsis'     => $data['synopsis'] ?? $anime->synopsis,
                        'episodes'     => $data['episodes'] ?? $anime->episodes,
                        'score'        => $data['score'] ?? $anime->score,
                        'status'       => $data['status'] ?? $anime->status,
                        'last_updated' => now(),
                    ]);

                    broadcast(new AnimeSyncProgress("✅ Anime {$anime->id} sincronizado"));
                } else {
                    broadcast(new AnimeSyncProgress("⚠️ Anime {$anime->id}: sin datos en MAL"));
                }
            } catch (\Exception $e) {
                broadcast(new AnimeSyncProgress("❌ Anime {$anime->id}: Error - {$e->getMessage()}"));
            }

            usleep(200000);
        }

        broadcast(new AnimeSyncProgress("🎉 Sincronización finalizada ({$total} procesados)"));
    }
}
