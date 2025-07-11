import { Badge } from '@/components/ui/badge';
import { AnimeData } from '@/types/anime';
import { EpisodeData } from '@/types/episode';
import { formatDate } from '@/utils/dates';
import { ColumnDef } from '@tanstack/react-table';
import { MonitorSmartphoneIcon, Tv2Icon } from 'lucide-react';
import { EpisodeDialogDelete } from './episode-dialog-delete';
import { EpisodeDialogForm } from './episode-dialog-form';

export function getEpisodeColumns(__: (key: string) => string, anime: AnimeData): ColumnDef<EpisodeData>[] {
    return [
        {
            accessorKey: 'id',
            header: __('episodes.table.id'),
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'number',
            header: __('episodes.table.number'),
            cell: ({ row }) => {
                const isLatest = row.index === 0;
                return (
                    <span className="font-semibold">
                        {__('episodes.table.episode')} {row.original.number}
                        {isLatest && (
                            <Badge className="ml-2" variant="outline">
                                {__('common.latest')}
                            </Badge>
                        )}
                    </span>
                );
            },
        },
        {
            accessorKey: 'views',
            header: __('episodes.table.views'),
            cell: ({ getValue }) => (
                <Badge variant="secondary">
                    <Tv2Icon />
                    <span>{getValue<number>()}</span>
                </Badge>
            ),
        },
        {
            accessorKey: 'views_app',
            header: __('episodes.table.views_app'),
            cell: ({ getValue }) => (
                <Badge>
                    <MonitorSmartphoneIcon />
                    <span>{getValue<number>()}</span>
                </Badge>
            ),
        },
        {
            accessorKey: 'created_at',
            header: __('episodes.table.created_at'),
            cell: ({ getValue }) => {
                const date = getValue<string>();
                return <span className="text-sm text-muted-foreground">{formatDate(date)}</span>;
            },
        },
        {
            id: 'actions',
            header: __('episodes.table.actions'),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <EpisodeDialogForm anime={anime} episode={row.original} triggerType="icon" />
                    <EpisodeDialogDelete episode={row.original} />
                </div>
            ),
        },
    ];
}
