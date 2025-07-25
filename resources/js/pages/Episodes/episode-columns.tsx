import { Badge } from '@/components/ui/badge';
import { AnimeData } from '@/types/anime';
import { EpisodeData } from '@/types/episode';
import { formatDate } from '@/utils/dates';
import { ColumnDef } from '@tanstack/react-table';
import { AppWindow, Globe, PlayCircle } from 'lucide-react';

export function getEpisodeColumns(anime: AnimeData): ColumnDef<EpisodeData>[] {
    return [
        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ getValue }) => <span className="text-sm font-medium text-muted-foreground">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'number',
            header: 'Episodio',
            cell: ({ row }) => {
                const isLatest = row.index === 0;
                const episodeNumber = row.original.number;

                return (
                    <div className="w-[300px]">
                        <div className="flex items-center gap-2 leading-tight font-semibold">
                            <PlayCircle className="h-4 w-4 text-primary" />
                            Episodio {episodeNumber}
                            {isLatest && (
                                <Badge className="ml-2" variant="default">
                                    Último
                                </Badge>
                            )}
                        </div>
                        <div className="truncate text-sm text-muted-foreground">{anime.name}</div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Publicado',
            cell: ({ getValue }) => <span className="text-sm text-muted-foreground">{formatDate(getValue<string>())}</span>,
        },
        {
            accessorKey: 'views',
            header: 'Vistas Web',
            cell: ({ getValue }) => (
                <Badge variant="secondary" className="inline-flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {getValue<number>()}
                </Badge>
            ),
        },
        {
            accessorKey: 'views_app',
            header: 'Vistas App',
            cell: ({ getValue }) => (
                <Badge className="inline-flex items-center gap-1">
                    <AppWindow className="h-4 w-4" />
                    {getValue<number>()}
                </Badge>
            ),
        },
        {
            id: 'actions',
            header: 'Acciones',
        },
    ];
}
