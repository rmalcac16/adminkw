export interface AnimeData {
    id: number;
    name: string;
    name_alternative: string | null;
    slug: string;
    banner: string | null;
    poster: string | null;
    overview: string | null;
    aired: string | null;
    type: 'TV' | 'Movie' | 'Special' | 'OVA' | 'ONA' | string;
    status: number;
    premiered: string | null;
    broadcast: string | null;
    genres: string | null;
    rating: string | null;
    popularity: number;
    trailer: string | null;
    vote_average: number;
    prequel: number | null;
    sequel: number | null;
    related: string | null;
    views: number;
    views_app: number;
    isTopic: boolean;
    mal_id: number | null;
    tmdb_id: number | null;
    created_at: string;
    updated_at: string;
}
