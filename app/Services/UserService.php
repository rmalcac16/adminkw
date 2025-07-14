<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function paginate(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = User::query()
            ->select(['id', 'name', 'email', 'isPremium', 'created_at', 'email_verified_at']);

        if (!empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return $query
            ->orderByDesc('id')
            ->paginate($perPage)
            ->appends($filters);
    }

    public function kpis(): array
    {
        return Cache::remember('user_kpis', now()->addMinutes(5), function () {
            $now = now();

            $total = DB::table('users')->count();
            $premium = DB::table('users')->where('isPremium', true)->count();
            $verified = DB::table('users')->whereNotNull('email_verified_at')->count();
            $recent = DB::table('users')->where('created_at', '>=', $now->copy()->subDays(30))->count();

            return [
                'total_users' => $total,
                'premium_users' => $premium,
                'premium_percentage' => $total > 0 ? round(($premium / $total) * 100, 1) : 0,
                'verified_emails' => $verified,
                'verified_percentage' => $total > 0 ? round(($verified / $total) * 100, 1) : 0,
                'recent_users' => $recent,
                'updated_at' => $now->toDateTimeString(),
            ];
        });
    }

    public function find(User $user): ?User
    {
        return $user->load('roles');
    }

    public function updatePassword(User $user, string $newPassword): bool
    {
        $user->password = Hash::make($newPassword);
        return $user->save();
    }

    public function updateEmail(User $user, string $newEmail): bool
    {
        if ($user->email === trim($newEmail)) {
            return true;
        }

        $user->email = $newEmail;
        $user->email_verified_at = null;
        $saved = $user->save();

        if ($saved) {
            $this->clearKpiCache();
        }

        return $saved;
    }

    public function togglePremium(User $user, $request): bool
    {
        $user->isPremium = filter_var($request->input('isPremium'), FILTER_VALIDATE_BOOLEAN);
        $saved = $user->save();

        if ($saved) {
            $this->clearKpiCache();
        }

        return $saved;
    }

    public function delete(User $user): bool
    {
        $deleted = $user->delete();

        if ($deleted) {
            $this->clearKpiCache();
        }

        return $deleted;
    }

    private function clearKpiCache(): void
    {
        Cache::forget('user_kpis');
    }
}
