import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimeData } from '@/types/anime';
import { formatDate } from '@/utils/dates';
import { shortenText } from '@/utils/text';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit2 } from 'lucide-react';
import { AnimeDialogDelete } from './anime-dialog-delete';

export function getAnimeColumns(__: (key: string) => string): ColumnDef<AnimeData>[] {
    return [
        {
            accessorKey: 'id',
            header: __('animes.labels.id'),
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'name',
            header: __('animes.labels.name'),
            enableColumnFilter: true,
            cell: ({ row }) => {
                const name = row.original.name;
                const name_alternative = row.original.name_alternative;

                return (
                    <Link href={route().has('episodes.index') ? route('episodes.index', { anime: row.original.id }) : '#'}>
                        <div className="max-w-[330px] space-y-0.5">
                            <div className="max-w-[330px] text-sm font-medium">{shortenText(name)}</div>

                            <div className="line-clamp-1 max-w-[330px] text-xs overflow-ellipsis text-muted-foreground">
                                {name_alternative ? shortenText(name_alternative) : '--'}
                            </div>
                        </div>
                    </Link>
                );
            },
        },
        {
            accessorKey: 'slug',
            header: __('animes.labels.slug'),
            cell: ({ getValue }) => (
                <div className="max-w-[250px]">
                    <code className="line-clamp-1 inline-block max-w-[250px] overflow-hidden rounded bg-muted px-[0.3rem] py-[0.2rem] text-xs text-ellipsis whitespace-nowrap">
                        {getValue<string>()}
                    </code>
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: __('animes.labels.status'),
            cell: ({ getValue }) => {
                const status = getValue<number>();

                const statusMap: Record<number, { className: string }> = {
                    0: {
                        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                    },
                    1: {
                        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                    },
                    2: {
                        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                    },
                    3: {
                        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                    },
                };

                const { className } = statusMap[status] || {
                    className: 'bg-muted text-muted-foreground',
                };

                return (
                    <Badge variant="secondary" className={`${className}`}>
                        {__(`animes.statuses.${status}`)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'aired',
            header: __('animes.labels.aired'),
            cell: ({ getValue }) => {
                const date = getValue<string>();
                return <span className="text-sm">{formatDate(date)}</span>;
            },
        },
        {
            id: 'actions',
            header: __('animes.labels.actions'),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="icon" className="h-8 w-8">
                        <Link href={route('animes.edit', row.original.id)}>
                            <Edit2 />
                        </Link>
                    </Button>
                    <AnimeDialogDelete anime={row.original} />
                </div>
            ),
        },
    ];
}
