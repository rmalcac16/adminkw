import { AnimeData } from './anime';

export interface EpisodeData {
    id: number;
    number: number;
    views: number | 0;
    views_app: number | 0;
    anime_id: number;
    anime: AnimeData;
    created_at: string;
    updated_at: string;
}
