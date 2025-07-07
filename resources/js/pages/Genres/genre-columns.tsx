// resources/js/pages/Genres/genre-columns.ts
import { Badge } from '@/components/ui/badge';
import { GenreData } from '@/types/genre';
import { ColumnDef } from '@tanstack/react-table';
import { AlertCircleIcon, CheckIcon } from 'lucide-react';
import { GenreDialogDelete } from './genre-dialog-delete';
import { GenreDialogForm } from './genre-dialog-form';

export function getGenreColumns(__: (key: string) => string): ColumnDef<GenreData>[] {
    return [
        {
            accessorKey: 'id',
            header: __('genres.table.id'),
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'title',
            header: __('genres.table.title'),
            enableColumnFilter: true,
            cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'slug',
            header: __('genres.table.slug'),
            cell: ({ getValue }) => <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-xs">{getValue<string>()}</code>,
        },
        {
            accessorKey: 'name_mal',
            header: __('genres.table.name_mal'),
            cell: ({ getValue }) => {
                const nameMal = getValue<string>()?.trim();
                const isDefined = Boolean(nameMal);

                return (
                    <div className="flex max-w-xs items-center justify-between gap-2">
                        <span className="truncate text-sm">{nameMal || '—'}</span>

                        <Badge variant={isDefined ? 'secondary' : 'outline'} className={isDefined ? 'bg-blue-500 text-white dark:bg-blue-600' : ''}>
                            {isDefined ? (
                                <>
                                    <CheckIcon className="mr-1 h-4 w-4" />
                                    {__('genres.table.name_mal_defined')}
                                </>
                            ) : (
                                <>
                                    <AlertCircleIcon className="mr-1 h-4 w-4" />
                                    {__('genres.table.name_mal_undefined')}
                                </>
                            )}
                        </Badge>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: __('genres.table.actions'),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <GenreDialogForm genre={row.original} triggerType="icon" />
                    <GenreDialogDelete genre={row.original} />
                </div>
            ),
        },
    ];
}
