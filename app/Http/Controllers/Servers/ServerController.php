<?php

namespace App\Http\Controllers\Servers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Servers\StoreServerRequest;
use App\Http\Requests\Servers\UpdateServerRequest;
use App\Models\Server;
use App\Services\ServerService;
use Inertia\Inertia;

class ServerController extends Controller
{

    protected $serverService;

    public function __construct(ServerService $serverService)
    {
        $this->serverService = $serverService;
        syncLangFiles(['servers']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $servers = $this->serverService->getAll();
        return Inertia::render('Servers/Index', [
            'servers' => $servers,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServerRequest $request)
    {
        $validatedData = $request->validated();
        $this->serverService->create($validatedData);

        return redirect()->route('servers.index')->with('success', __('servers.create.success', ['name' => $validatedData['title']]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServerRequest $request, Server $server)
    {
        $validatedData = $request->validated();
        $this->serverService->update($server, $validatedData);

        return redirect()->route('servers.index')->with('success', __('servers.edit.success', ['name' => $validatedData['title']]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Server $server)
    {
        $this->serverService->delete($server);
        return redirect()->route('servers.index')->with('success', __('servers.delete.success', ['name' => $server->title]));
    }
}
