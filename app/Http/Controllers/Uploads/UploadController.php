<?php

namespace App\Http\Controllers\Uploads;

use App\Http\Controllers\Controller;
use App\Services\UploadService;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    protected UploadService $uploadService;

    public function __construct(UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
        syncLangFiles(['uploads']);
    }


    public function getServers()
    {
        $servers = $this->uploadService->getAllServers();
        return response()->json($servers);
    }
}
