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
            ['title' => 'Acción', 'slug' => 'accion'],
            ['title' => 'Artes Marciales', 'slug' => 'artes-marciales'],
            ['title' => 'Aventura', 'slug' => 'aventura'],
            ['title' => 'Ciencia Ficción', 'slug' => 'ciencia-ficcion'],
            ['title' => 'Comedia', 'slug' => 'comedia'],
            ['title' => 'Deportes', 'slug' => 'deportes'],
            ['title' => 'Detectives', 'slug' => 'detectives'],
            ['title' => 'Drama', 'slug' => 'drama'],
            ['title' => 'Ecchi', 'slug' => 'ecchi'],
            ['title' => 'Escolar', 'slug' => 'escolar'],
            ['title' => 'Espacio', 'slug' => 'espacio'],
            ['title' => 'Fantasía', 'slug' => 'fantasia'],
            ['title' => 'Gore', 'slug' => 'gore'],
            ['title' => 'Harem', 'slug' => 'harem'],
            ['title' => 'Histórico', 'slug' => 'historico'],
            ['title' => 'Horror', 'slug' => 'horror'],
            ['title' => 'Isekai', 'slug' => 'isekai'],
            ['title' => 'Josei', 'slug' => 'josei'],
            ['title' => 'Juegos', 'slug' => 'juegos'],
            ['title' => 'Mahou Shoujo', 'slug' => 'mahou-shoujo'],
            ['title' => 'Mecha', 'slug' => 'mecha'],
            ['title' => 'Militar', 'slug' => 'militar'],
            ['title' => 'Misterio', 'slug' => 'misterio'],
            ['title' => 'Mitológico', 'slug' => 'mitologico'],
            ['title' => 'Musica', 'slug' => 'musica'],
            ['title' => 'Parodia', 'slug' => 'parodia'],
            ['title' => 'Psicológico', 'slug' => 'psicologico'],
            ['title' => 'Recuentos De La Vida', 'slug' => 'recuentos-de-la-vida'],
            ['title' => 'Romance', 'slug' => 'romance'],
            ['title' => 'Samurais', 'slug' => 'samurais'],
            ['title' => 'Seinen', 'slug' => 'seinen'],
            ['title' => 'Shoujo', 'slug' => 'shoujo'],
            ['title' => 'Shoujo Ai', 'slug' => 'shoujo-ai'],
            ['title' => 'Shounen', 'slug' => 'shounen'],
            ['title' => 'Shounen Ai', 'slug' => 'shounen-ai'],
            ['title' => 'Sobrenatural', 'slug' => 'sobrenatural'],
            ['title' => 'Soft Hentai', 'slug' => 'soft-hentai'],
            ['title' => 'Suspenso', 'slug' => 'suspenso'],
            ['title' => 'Super Poderes', 'slug' => 'super-poderes'],
            ['title' => 'Vampiros', 'slug' => 'vampiros'],
        ];

        DB::table('genres')->insert($genres);
    }
}
