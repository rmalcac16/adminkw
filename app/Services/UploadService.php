<?php

namespace App\Services;

use App\Models\Server;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class UploadService
{
    protected array $servers = [
        'Gamma' => [
            'id' => 1,
            'url' => 'https://voe.sx/api/upload/server',
            'key' => '8UiyNj2OFB8VLAyHiptwTtKDzCogDuFgZh0yaLqSHHwZJr4oOWDDKDdvjMvOZl47',
        ],
        'Delta' => [
            'id' => 2,
            'url' => 'https://filemoonapi.com/api/upload/server',
            'key' => '79727x82hgyekaonbzjg7',
        ],
        'Epsilon' => [
            'id' => 3,
            'url' => 'https://lulustream.com/api/upload/server',
            'key' => '94176w33vl8cw4jue7shp',
        ],
        'Alpha' => [
            'id' => 4,
            'url' => 'https://streamhgapi.com/api/upload/server',
            'key' => '25814t917axclc149px0h',
        ],
    ];


    public function getAllServers(): array
    {
        $servers = [];

        foreach ($this->servers as $name => $data) {
            try {
                $response = Http::get($data['url'], [
                    'key' => $data['key'],
                ]);

                if ($response->successful() && isset($response['result'])) {
                    $servers[] = [
                        'id' => $data['id'],
                        'title' => $name,
                        'upload_url' => $response['result'],
                        'key' => $data['key'],
                    ];
                } else {
                    $servers[] = [
                        'id' => $data['id'],
                        'title' => $name,
                        'upload_url' => null,
                        'key' => $data['key'],
                        'error' => $response->json()['msg'] ?? 'Respuesta inválida',
                    ];
                }
            } catch (\Exception $e) {
                $servers[] = [
                    'id' => $data['id'],
                    'title' => $name,
                    'upload_url' => null,
                    'key' => $data['key'],
                    'error' => $e->getMessage(),
                ];
            }
        }

        return $servers;
    }

    public function uploadFile(array $data): array
    {
        $serverDB = Server::find($data['server_id']);
        if (!$serverDB || !isset($this->servers[$serverDB->title])) {
            return ['status' => 'error', 'message' => 'Invalid server selected.'];
        }

        $cacheKey = 'upload_server_' . $serverDB->title;

        if (!Cache::has($cacheKey)) {
            Log::error("No cached upload URL for server: {$serverDB->title}");
            return ['status' => 'error', 'message' => 'No upload URL available. Try again later.'];
        }

        $uploadUrl = Cache::get($cacheKey)['url'];
        $file = $data['file'];

        try {
            $response = Http::attach(
                'file',
                file_get_contents($file->getRealPath()),
                $file->getClientOriginalName()
            )->post($uploadUrl, [
                'key' => $this->servers[$serverDB->title]['key'],
            ]);

            if (!$response->successful()) {
                Log::error("Upload failed: HTTP  " . $response->status());
                return ['status' => 'error', 'message' => 'Upload failed.'];
            }

            $json = $response->json();

            // Adaptar al formato común
            if ($this->isValidStandardResponse($json)) {
                $fileData = $json['files'][0];
                return [
                    'status' => 'ok',
                    'code' => $fileData['filecode'],
                    'code_backup' => $this->generateFullUrl($serverDB->embed, $fileData['filecode']),
                ];
            }

            if (isset($json['success']) && $json['success'] === true && isset($json['file']['file_code'])) {
                return [
                    'status' => 'ok',
                    'code' => $json['file']['file_code'],
                    'code_backup' => $this->generateFullUrl($serverDB->embed, $json['file']['file_code']),
                ];
            }

            Log::error("Unknown response format from {$serverDB->title}", ['response' => $json]);

            return [
                'status' => 'error',
                'message' => $json['message'] ?? 'Unexpected server response.',
            ];
        } catch (\Exception $e) {
            Log::error("Exception while uploading: " . $e->getMessage());
            return ['status' => 'error', 'message' => 'An error occurred during upload.'];
        }
    }

    protected function generateFullUrl(string $embed, string $code): string
    {
        return rtrim($embed, '/') . '/e/' . $code;
    }

    protected function isValidStandardResponse(array $json): bool
    {
        return isset($json['status'], $json['files']) &&
            $json['status'] === 200 &&
            is_array($json['files']) &&
            count($json['files']) > 0 &&
            isset($json['files'][0]['filecode']);
    }
}
