<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
        syncLangFiles(['dashboard']);
    }


    public function index(Request $request)
    {
        $kpis = $this->dashboardService->getStats();

        return Inertia::render('Dashboard/Index', [
            'kpis' => $kpis,
        ]);
    }
}
