// resources/js/pages/Genres/genre-columns.ts
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimeData } from '@/types/anime';
import { shortenText } from '@/utils/text';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, ClockIcon, Edit2, HelpCircleIcon, LoaderIcon, PauseIcon } from 'lucide-react';
import { JSX } from 'react';
import { AnimeDialogDelete } from './anime-dialog-delete';

const statusMap: Record<
    number,
    {
        label: string;
        icon: JSX.Element;
        className: string;
    }
> = {
    0: {
        label: 'animes.status.finished',
        icon: <CheckIcon />,
        className: 'bg-gray-500 text-white dark:bg-gray-600',
    },
    1: {
        label: 'animes.status.airing',
        icon: <LoaderIcon className="animate-spin" />,
        className: 'bg-green-500 text-white dark:bg-green-600',
    },
    2: {
        label: 'animes.status.paused',
        icon: <PauseIcon />,
        className: 'bg-yellow-500 text-white dark:bg-yellow-600',
    },
    3: {
        label: 'animes.status.upcoming',
        icon: <ClockIcon />,
        className: 'bg-blue-500 text-white dark:bg-blue-600',
    },
};

export function getAnimeColumns(__: (key: string) => string): ColumnDef<AnimeData>[] {
    return [
        {
            accessorKey: 'id',
            header: __('animes.table.id'),
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'name',
            header: __('animes.table.name'),
            enableColumnFilter: true,
            cell: ({ row }) => {
                const name = row.original.name;
                const name_alternative = row.original.name_alternative;

                return (
                    <Link href={route().has('episodes.index') ? route('episodes.index', { anime: row.original.id }) : '#'}>
                        <div className="max-w-[330px] space-y-0.5">
                            <div className="max-w-[330px] text-sm font-medium">{shortenText(name)}</div>

                            <div className="line-clamp-1 max-w-[330px] text-xs overflow-ellipsis text-muted-foreground">
                                {name_alternative ? shortenText(name_alternative) : __('common.no_alternative_name')}
                            </div>
                        </div>
                    </Link>
                );
            },
        },
        {
            accessorKey: 'slug',
            header: __('animes.table.slug'),
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
            header: __('animes.table.status'),
            cell: ({ getValue }) => {
                const status = getValue<number>();
                const config = statusMap[status];

                if (!config) {
                    return (
                        <Badge variant="outline">
                            <HelpCircleIcon />
                            {__('common.unknown')}
                        </Badge>
                    );
                }

                return (
                    <Badge variant="secondary" className={config.className}>
                        {config.icon}
                        {__(config.label)}
                    </Badge>
                );
            },
        },

        {
            accessorKey: 'aired',
            header: __('animes.table.aired'),
            cell: ({ getValue }) => {
                const date = getValue<string>();
                return <span className="text-sm">{date || __('common.unknown')}</span>;
            },
        },
        {
            id: 'actions',
            header: __('animes.table.actions'),
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
