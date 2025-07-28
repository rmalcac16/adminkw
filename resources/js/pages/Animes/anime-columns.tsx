import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { AnimeData } from '@/types/anime';
import { formatDate } from '@/utils/dates';
import { shortenText } from '@/utils/text';
import { Link } from '@inertiajs/react';
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit2 } from 'lucide-react';
import { JSX } from 'react';
import { toast } from 'sonner';
import { AnimeDialogDelete } from './anime-dialog-delete';

export function getAnimeColumns(): ColumnDef<AnimeData>[] {
    return [
        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'name',
            header: 'Nombre',
            enableColumnFilter: true,
            cell: ({ row }) => {
                const name = row.original.name;
                const nameAlternative = row.original.name_alternative;

                return (
                    <div className="max-w-[330px] space-y-0.5">
                        <div className="max-w-[330px] text-sm font-medium">{shortenText(name)}</div>
                        <div className="line-clamp-1 max-w-[330px] text-xs overflow-ellipsis text-muted-foreground">
                            {nameAlternative ? shortenText(nameAlternative) : '--'}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'short_name',
            header: 'Nombre corto',
            cell: ({ getValue }) => (
                <ContextMenu>
                    <ContextMenuTrigger>
                        <Badge variant={'secondary'}>{getValue<string>() || '--'}</Badge>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-64">
                        <ContextMenuItem
                            inset
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(getValue<string>() || '');
                                toast.success('Nombre corto copiado al portapapeles');
                            }}
                        >
                            Copiar
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ),
        },
        {
            accessorKey: 'slug',
            header: 'Slug',
            cell: ({ getValue }) => (
                <Badge variant={'secondary'} className="line-clamp-1 max-w-[250px] overflow-ellipsis">
                    {shortenText(getValue<string>())}
                </Badge>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Estado',
            cell: ({ getValue }) => {
                const status = getValue<number>();

                const statusMap: Record<number, { className: string; icon: JSX.Element; label: string }> = {
                    0: {
                        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                        icon: <IconCircleXFilled className="h-4 w-4 text-red-500 dark:text-red-400" />,
                        label: 'Finalizado',
                    },
                    1: {
                        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                        icon: <IconCircleCheckFilled className="h-4 w-4 text-green-500 dark:text-green-400" />,
                        label: 'En emisión',
                    },
                    2: {
                        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                        icon: <IconCircleXFilled className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />,
                        label: 'En pausa',
                    },
                    3: {
                        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                        icon: <IconCircleXFilled className="h-4 w-4 text-blue-500 dark:text-blue-400" />,
                        label: 'No emitido aún',
                    },
                };

                const { className, label } = statusMap[status] || {
                    className: 'bg-muted text-muted-foreground',
                    label: 'Desconocido',
                };

                return (
                    <Badge variant="outline">
                        {statusMap[status].icon}
                        {statusMap[status].label}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'type',
            header: 'Tipo',
            cell: ({ getValue }) => {
                const type = (getValue<string>() || '').toLowerCase();

                const typeMap: Record<string, { className: string; label: string }> = {
                    tv: { className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', label: 'TV' },
                    movie: { className: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200', label: 'Película' },
                    special: { className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200', label: 'Especial' },
                    ova: { className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200', label: 'OVA' },
                    ona: { className: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200', label: 'ONA' },
                };

                const config = typeMap[type] || {
                    className: 'bg-muted text-muted-foreground',
                    label: 'Desconocido',
                };

                return <Badge className={config.className}>{config.label}</Badge>;
            },
        },
        {
            accessorKey: 'aired',
            header: 'Emitido desde',
            cell: ({ getValue }) => {
                const date = getValue<string>();
                return <small>{formatDate(date)}</small>;
            },
        },
        {
            id: 'actions',
            header: 'Acciones',
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
