<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            ['title' => 'Acción', 'slug' => 'accion', 'name_mal' => 'Action'],
            ['title' => 'Artes Marciales', 'slug' => 'artes-marciales', 'name_mal' => 'Martial Arts'],
            ['title' => 'Aventura', 'slug' => 'aventura', 'name_mal' => 'Adventure'],
            ['title' => 'Ciencia Ficción', 'slug' => 'ciencia-ficcion', 'name_mal' => 'Sci-Fi'],
            ['title' => 'Comedia', 'slug' => 'comedia', 'name_mal' => 'Comedy'],
            ['title' => 'Deportes', 'slug' => 'deportes', 'name_mal' => 'Sports'],
            ['title' => 'Detectives', 'slug' => 'detectives', 'name_mal' => 'Detective'],
            ['title' => 'Drama', 'slug' => 'drama', 'name_mal' => 'Drama'],
            ['title' => 'Ecchi', 'slug' => 'ecchi', 'name_mal' => 'Ecchi'],
            ['title' => 'Escolar', 'slug' => 'escolar', 'name_mal' => 'School'],
            ['title' => 'Espacio', 'slug' => 'espacio', 'name_mal' => 'Space'],
            ['title' => 'Fantasía', 'slug' => 'fantasia', 'name_mal' => 'Fantasy'],
            ['title' => 'Gore', 'slug' => 'gore', 'name_mal' => 'Gore'],
            ['title' => 'Harem', 'slug' => 'harem', 'name_mal' => 'Harem'],
            ['title' => 'Histórico', 'slug' => 'historico', 'name_mal' => 'Historical'],
            ['title' => 'Horror', 'slug' => 'horror', 'name_mal' => 'Horror'],
            ['title' => 'Isekai', 'slug' => 'isekai', 'name_mal' => 'Isekai'],
            ['title' => 'Josei', 'slug' => 'josei', 'name_mal' => 'Josei'],
            ['title' => 'Juegos', 'slug' => 'juegos', 'name_mal' => 'Game'],
            ['title' => 'Mahou Shoujo', 'slug' => 'mahou-shoujo', 'name_mal' => 'Mahou Shoujo'],
            ['title' => 'Mecha', 'slug' => 'mecha', 'name_mal' => 'Mecha'],
            ['title' => 'Militar', 'slug' => 'militar', 'name_mal' => 'Military'],
            ['title' => 'Misterio', 'slug' => 'misterio', 'name_mal' => 'Mystery'],
            ['title' => 'Mitológico', 'slug' => 'mitologico', 'name_mal' => 'Mythology'],
            ['title' => 'Musica', 'slug' => 'musica', 'name_mal' => 'Music'],
            ['title' => 'Parodia', 'slug' => 'parodia', 'name_mal' => 'Parody'],
            ['title' => 'Psicológico', 'slug' => 'psicologico', 'name_mal' => 'Psychological'],
            ['title' => 'Recuentos De La Vida', 'slug' => 'recuentos-de-la-vida', 'name_mal' => 'Slice of Life'],
            ['title' => 'Romance', 'slug' => 'romance', 'name_mal' => 'Romance'],
            ['title' => 'Samurais', 'slug' => 'samurais', 'name_mal' => 'Samurai'],
            ['title' => 'Seinen', 'slug' => 'seinen', 'name_mal' => 'Seinen'],
            ['title' => 'Shoujo', 'slug' => 'shoujo', 'name_mal' => 'Shoujo'],
            ['title' => 'Shoujo Ai', 'slug' => 'shoujo-ai', 'name_mal' => 'Shoujo Ai'],
            ['title' => 'Shounen', 'slug' => 'shounen', 'name_mal' => 'Shounen'],
            ['title' => 'Shounen Ai', 'slug' => 'shounen-ai', 'name_mal' => 'Shounen Ai'],
            ['title' => 'Sobrenatural', 'slug' => 'sobrenatural', 'name_mal' => 'Supernatural'],
            ['title' => 'Soft Hentai', 'slug' => 'soft-hentai', 'name_mal' => 'Hentai'],
            ['title' => 'Suspenso', 'slug' => 'suspenso', 'name_mal' => 'Suspense'],
            ['title' => 'Super Poderes', 'slug' => 'super-poderes', 'name_mal' => 'Super Power'],
            ['title' => 'Vampiros', 'slug' => 'vampiros', 'name_mal' => 'Vampire'],
        ];

        DB::table('genres')->insert($genres);
    }
}
