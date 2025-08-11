import { GenreData } from '@/types/genre';

export function parseMalAnime(mal: any, allGenres: GenreData[]) {
    // ----------------------------
    // Títulos principales y alternativos
    // ----------------------------
    const title = mal.title || '';
    const cleanTitle = (title: string) => title.replace(/,/g, ''); // o reemplaza por otro char

    const alternatives = [...(mal.alternative_titles?.synonyms || []), mal.alternative_titles?.en, mal.alternative_titles?.ja]
        .filter(Boolean)
        .map(cleanTitle) // limpiar comas internas
        .join(',');

    const englishTitle = mal.alternative_titles?.en || '';

    // ----------------------------
    // Estado del anime
    // ----------------------------
    // 1 = en emisión, 0 = finalizado, 3 = no emitido aún
    let status = '1';
    if (mal.status === 'finished_airing') {
        status = '0';
    } else if (mal.status === 'not_yet_aired') {
        status = '3';
    }

    // ----------------------------
    // Fechas y estadísticas
    // ----------------------------
    const aired = mal.start_date || '';
    const vote_average = mal.mean || 0;
    const popularity = mal.popularity || 0;
    const rating = mal.rating || 'pg';

    // ----------------------------
    // Tipos de medios (MAP de MyAnimeList → estándar interno)
    // ----------------------------
    const mediaTypeMap: Record<string, string> = {
        tv: 'TV',
        movie: 'Movie',
        ona: 'ONA',
        ova: 'OVA',
        special: 'Special',
        music: 'Music',
        tv_special: 'Special',
    };

    const type = mediaTypeMap[mal.media_type?.toLowerCase()] || 'TV';

    // ----------------------------
    // Géneros: buscar coincidencias entre MAL y los locales
    // ----------------------------
    const genresMatched = Array.isArray(mal.genres)
        ? mal.genres
              .map((g: any) => {
                  if (!g?.name) return undefined;
                  const match = allGenres.find((local) => local.name_mal?.toLowerCase() === g.name?.toLowerCase());
                  return match?.slug;
              })
              .filter(Boolean)
        : [];

    // ----------------------------
    // Mapeo de días a números (1 = Lunes ... 7 = Domingo)
    // ----------------------------
    const dayMap: Record<string, number> = {
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
        sunday: 7,
    };

    // ----------------------------
    // Calcular día de emisión ajustado a zona local
    // ----------------------------
    let broadcast: string | null = null;

    if (mal.broadcast?.day_of_the_week && mal.broadcast?.start_time) {
        const day = mal.broadcast.day_of_the_week.toLowerCase();
        const time = mal.broadcast.start_time;

        const originalDayNumber = dayMap[day];
        const [hourStr] = time.split(':');
        const hour = parseInt(hourStr, 10);

        let localDay = originalDayNumber;

        // Ajustar día si el estreno ocurre antes de las 14:00 (conversión de zona horaria)
        if (hour < 14) {
            localDay -= 1;
            if (localDay < 1) localDay = 7; // si pasa a 0, retrocede al domingo
        }

        broadcast = String(localDay); // convertir a string
    }

    // ----------------------------
    // Temporada de estreno (ej. "Spring 2023")
    // ----------------------------
    let premiered: string | null = null;
    if (mal.start_season?.year && mal.start_season?.season) {
        const season = mal.start_season.season;
        const capitalizedSeason = season.charAt(0).toUpperCase() + season.slice(1);
        premiered = `${capitalizedSeason} ${mal.start_season.year}`;
    }

    // ----------------------------
    // Retorno de datos normalizados
    // ----------------------------
    return {
        name: title,
        name_en: englishTitle,
        name_alternative: alternatives,
        status,
        aired,
        rating,
        vote_average,
        popularity,
        type,
        mal_id: mal.id,
        genres: genresMatched.join(','), // géneros separados por coma
        broadcast, // string "1–7" o null
        premiered, // ej. "Spring 2023"
    };
}
