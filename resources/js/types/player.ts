import { EpisodeData } from './episode';
import { ServerData } from './server';

export interface PlayerData {
    id: number;
    code: string | null;
    languaje: number | 0;
    server_id: number;
    episode_id: number;
    server: ServerData;
    episode: EpisodeData;
    created_at: string;
    updated_at: string;
}
