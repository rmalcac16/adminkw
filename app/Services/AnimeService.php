<?php

namespace App\Services;

use App\Models\Anime;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;

class AnimeService
{

    public static function getAll(): Collection
    {
        return Anime::orderBy('id', 'desc')->get();
    }

    public function paginate(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = Anime::query();

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where('name', 'like', "%{$search}%");
        }

        return $query->orderBy('id', 'desc')->paginate($perPage)->appends($filters);
    }

    public function create(array $data): Anime
    {
        $originalName = $data['name'] ?? '';

        $data['name'] = $this->generateUniqueName($originalName);

        if (empty($data['slug'])) {
            $data['slug'] = $this->generateUniqueSlug($data['name']);
        } else {
            $data['slug'] = $this->generateUniqueSlug($data['slug']);
        }

        return Anime::create($data);
    }

    public function update(Anime $anime, array $data): Anime
    {
        if (isset($data['name']) && $data['name'] !== $anime->name) {
            $data['name'] = $this->generateUniqueName($data['name'], $anime->id);
            $data['slug'] = $this->generateUniqueSlug($data['name'], $anime->id);
        }

        if (empty($data['slug'])) {
            $data['slug'] = $this->generateUniqueSlug($data['name'] ?? $anime->name, $anime->id);
        } else {
            $data['slug'] = $this->generateUniqueSlug($data['slug'], $anime->id);
        }

        $anime->update($data);

        return $anime;
    }

    public function delete(Anime $anime): bool
    {
        return $anime->delete();
    }

    protected function generateUniqueSlug(string $name, ?int $excludeId = null): string
    {
        $slug = Str::slug($name, '-');
        $originalSlug = $slug;
        $counter = 2;

        while (
            Anime::where('slug', $slug)
            ->when($excludeId, fn($query) => $query->where('id', '!=', $excludeId))
            ->exists()
        ) {
            $slug = $originalSlug . '-' . $counter++;
        }

        return $slug;
    }

    protected function generateUniqueName(string $name, ?int $excludeId = null): string
    {
        $originalName = $name;
        $counter = 2;

        while (
            Anime::where('name', $name)
            ->when($excludeId, fn($query) => $query->where('id', '!=', $excludeId))
            ->exists()
        ) {
            $name = $originalName . ' ' . $counter++;
        }

        return $name;
    }
}
