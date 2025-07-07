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
            ['name' => 'Acción', 'slug' => 'accion'],
            ['name' => 'Artes Marciales', 'slug' => 'artes-marciales'],
            ['name' => 'Aventura', 'slug' => 'aventura'],
            ['name' => 'Ciencia Ficción', 'slug' => 'ciencia-ficcion'],
            ['name' => 'Comedia', 'slug' => 'comedia'],
            ['name' => 'Deportes', 'slug' => 'deportes'],
            ['name' => 'Detectives', 'slug' => 'detectives'],
            ['name' => 'Drama', 'slug' => 'drama'],
            ['name' => 'Ecchi', 'slug' => 'ecchi'],
            ['name' => 'Escolar', 'slug' => 'escolar'],
            ['name' => 'Espacio', 'slug' => 'espacio'],
            ['name' => 'Fantasía', 'slug' => 'fantasia'],
            ['name' => 'Gore', 'slug' => 'gore'],
            ['name' => 'Harem', 'slug' => 'harem'],
            ['name' => 'Histórico', 'slug' => 'historico'],
            ['name' => 'Horror', 'slug' => 'horror'],
            ['name' => 'Isekai', 'slug' => 'isekai'],
            ['name' => 'Josei', 'slug' => 'josei'],
            ['name' => 'Juegos', 'slug' => 'juegos'],
            ['name' => 'Mahou Shoujo', 'slug' => 'mahou-shoujo'],
            ['name' => 'Mecha', 'slug' => 'mecha'],
            ['name' => 'Militar', 'slug' => 'militar'],
            ['name' => 'Misterio', 'slug' => 'misterio'],
            ['name' => 'Mitológico', 'slug' => 'mitologico'],
            ['name' => 'Musica', 'slug' => 'musica'],
            ['name' => 'Parodia', 'slug' => 'parodia'],
            ['name' => 'Psicológico', 'slug' => 'psicologico'],
            ['name' => 'Recuentos De La Vida', 'slug' => 'recuentos-de-la-vida'],
            ['name' => 'Romance', 'slug' => 'romance'],
            ['name' => 'Samurais', 'slug' => 'samurais'],
            ['name' => 'Seinen', 'slug' => 'seinen'],
            ['name' => 'Shoujo', 'slug' => 'shoujo'],
            ['name' => 'Shoujo Ai', 'slug' => 'shoujo-ai'],
            ['name' => 'Shounen', 'slug' => 'shounen'],
            ['name' => 'Shounen Ai', 'slug' => 'shounen-ai'],
            ['name' => 'Sobrenatural', 'slug' => 'sobrenatural'],
            ['name' => 'Soft Hentai', 'slug' => 'soft-hentai'],
            ['name' => 'Suspenso', 'slug' => 'suspenso'],
            ['name' => 'Super Poderes', 'slug' => 'super-poderes'],
            ['name' => 'Vampiros', 'slug' => 'vampiros'],
        ];

        DB::table('genres')->insert($genres);
    }
}
