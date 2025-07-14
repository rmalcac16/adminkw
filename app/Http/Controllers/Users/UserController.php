<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\UpdateEmailRequest;
use App\Http\Requests\Users\UpdatePasswordRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
        syncLangFiles(['users']);
    }


    public function index(Request $request)
    {
        $filters = $request->only(['search']);
        $users = $this->userService->paginate($filters, 10);
        $kpis = $this->userService->kpis();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => $filters,
            'kpis' => $kpis,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->userService->delete($user);
        return back()->with('success', __('users.messages.deleted', ['name' => $user->name]));
    }

    public function updatePassword(UpdatePasswordRequest $request, User $user)
    {
        $validatedData = $request->validated();
        $this->userService->updatePassword($user, $validatedData['password']);
        return back()->with('success', __('users.messages.password_updated'));
    }

    public function updateEmail(UpdateEmailRequest $request, User $user)
    {
        $validated = $request->validated();
        $this->userService->updateEmail($user, $validated['email']);
        return back()->with('success', __('users.messages.email_updated'));
    }


    public function togglePremium(Request $request, User $user)
    {
        $this->userService->togglePremium($user, $request);
        return back()->with('success', 'Estado premium actualizado.');
    }
}
