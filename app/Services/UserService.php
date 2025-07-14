<?php

namespace App\Services;

use App\Models\Anime;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;

class UserService
{

    public function paginate(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = User::query();

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where('name', 'like', "%{$search}%");
            $query->orWhere('email', 'like', "%{$search}%");
        }

        return $query->orderBy('id', 'desc')->paginate($perPage)->appends($filters);
    }

    public function kpis(): array
    {
        $totalUsers = User::count();
        $premiumUsers = User::where('isPremium', true)->count();
        $verifiedEmails = User::where('email_verified_at', '!=', null)->count();
        $recentUsers = User::where('created_at', '>=', now()->subDays(30))->count();


        return [
            'total_users' => $totalUsers,
            'premium_users' => $premiumUsers,
            'premium_percentage' => $totalUsers > 0 ? round(($premiumUsers / $totalUsers) * 100, 1) : 0,
            'verified_emails' => $verifiedEmails,
            'verified_percentage' => $totalUsers > 0 ? round(($verifiedEmails / $totalUsers) * 100, 1) : 0,
            'recent_users' => $recentUsers,
        ];
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
        return $user->save();
    }

    public function delete(User $user): bool
    {
        return $user->delete();
    }
}
