import { Badge } from '@/components/ui/badge';
import { AnimeData } from '@/types/anime';
import { EpisodeData } from '@/types/episode';
import { formatDate } from '@/utils/dates';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Film, Tv2Icon } from 'lucide-react';

export function getEpisodeColumns(__: (key: string) => string, anime: AnimeData): ColumnDef<EpisodeData>[] {
    return [
        {
            accessorKey: 'id',
            header: __('episodes.labels.id'),
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'number',
            header: __('episodes.labels.number'),
            cell: ({ row }) => {
                const isLatest = row.index === 0;
                return (
                    <Link
                        href={route().has('players.index') ? route('players.index', { anime: anime.id, episode: row.original.id }) : '#'}
                        className="font-semibold"
                    >
                        {__('episodes.labels.episode')} {row.original.number}
                        {isLatest && (
                            <Badge className="ml-2" variant="outline">
                                {__('common.latest')}
                            </Badge>
                        )}
                    </Link>
                );
            },
        },
        {
            accessorKey: 'views',
            header: __('episodes.labels.views'),
            cell: ({ getValue }) => (
                <Badge variant="secondary">
                    <Tv2Icon />
                    <span>{getValue<number>()}</span>
                </Badge>
            ),
        },
        {
            accessorKey: 'views_app',
            header: __('episodes.labels.views_app'),
            cell: ({ getValue }) => (
                <Badge>
                    <Film />
                    <span>{getValue<number>()}</span>
                </Badge>
            ),
        },
        {
            accessorKey: 'created_at',
            header: __('episodes.labels.created_at'),
            cell: ({ getValue }) => {
                const date = getValue<string>();
                return <span className="text-sm text-muted-foreground">{formatDate(date)}</span>;
            },
        },
        {
            id: 'actions',
            header: __('episodes.labels.actions'),
        },
    ];
}
