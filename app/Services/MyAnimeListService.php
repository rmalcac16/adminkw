<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MyAnimeListService
{
    protected string $baseUrl = 'https://api.myanimelist.net/v2';
    protected string $clientId;

    public function __construct()
    {
        $clientId = config('services.myanimelist.client_id');

        if (!$clientId) {
            throw new \RuntimeException('❌ El MAL_CLIENT_ID no está definido en tu archivo .env');
        }

        $this->clientId = $clientId;
    }

    public function searchAnime(string $query, int $limit = 10): array
    {
        $response = Http::withHeaders([
            'X-MAL-CLIENT-ID' => $this->clientId,
        ])->get("{$this->baseUrl}/anime", [
            'q' => $query,
            'limit' => $limit,
            'fields' => 'title,alternative_titles,start_date,mean,popularity,media_type,status,rating,genres,start_season,broadcast',
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception("MyAnimeList API error: " . $response->body(), $response->status());
    }

    public function getAnimeById(int $id): array
    {
        $response = Http::withHeaders([
            'X-MAL-CLIENT-ID' => $this->clientId,
        ])->get("{$this->baseUrl}/anime/{$id}", [
            'fields' => 'title,alternative_titles,start_date,mean,popularity,media_type,status,rating,genres,start_season,broadcast',
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception("MyAnimeList API error: " . $response->body(), $response->status());
    }
}
