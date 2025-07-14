<?php

namespace App\Services;

use App\Models\Anime;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;

class AnimeService
{
    public function getAll(): Collection
    {
        return Anime::select(['id', 'name', 'name_alternative',  'slug', 'status', 'aired'])
            ->orderByDesc('id')
            ->get();
    }

    public function paginate(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = Anime::query()->select(['id', 'name', 'name_alternative', 'slug', 'status', 'aired']);

        if (!empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('name_alternative', 'like', "%{$search}%");
            });
        }

        return $query->orderByDesc('id')->paginate($perPage)->appends($filters);
    }


    public function find(Anime $anime): ?Anime
    {
        $anime->rating = $anime->rating ? $this->getRatingKey($anime->rating) : null;
        return $anime;
    }

    public function create(array $data): Anime
    {
        $originalName = trim($data['name'] ?? '');
        $data['name'] = $this->generateUniqueName($originalName);

        $slugBase = $data['slug'] ?? $data['name'];
        $data['slug'] = $this->generateUniqueSlug($slugBase);

        if (!empty($data['rating'])) {
            $data['rating'] = $this->translateRating($data['rating']);
        }

        return Anime::create($data);
    }

    public function update(Anime $anime, array $data): Anime
    {
        if (isset($data['name']) && trim($data['name']) !== $anime->name) {
            $data['name'] = $this->generateUniqueName($data['name'], $anime->id);
            $data['slug'] = $this->generateUniqueSlug($data['name'], $anime->id);
        }

        if (empty($data['slug'])) {
            $data['slug'] = $this->generateUniqueSlug($data['name'] ?? $anime->name, $anime->id);
        } else {
            $data['slug'] = $this->generateUniqueSlug($data['slug'], $anime->id);
        }

        if (!empty($data['rating'])) {
            $data['rating'] = $this->translateRating($data['rating']);
        }

        $anime->update($data);

        return $anime;
    }

    public function delete(Anime $anime): bool
    {
        return $anime->delete();
    }

    protected function generateUniqueSlug(string $slugBase, ?int $excludeId = null): string
    {
        $slug = Str::slug($slugBase);
        $original = $slug;
        $counter = 2;

        while (
            Anime::where('slug', $slug)
            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
            ->exists()
        ) {
            $slug = $original . '-' . $counter++;
        }

        return $slug;
    }

    protected function generateUniqueName(string $name, ?int $excludeId = null): string
    {
        $original = $name;
        $counter = 2;

        while (
            Anime::where('name', $name)
            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
            ->exists()
        ) {
            $name = $original . ' ' . $counter++;
        }

        return $name;
    }

    protected function translateRating(string $key): ?string
    {
        return __('animes.ratings.' . $key);
    }

    protected function getRatingKey(string $label): ?string
    {
        $ratings = __('animes.ratings');
        return array_search($label, $ratings, true) ?: null;
    }
}
