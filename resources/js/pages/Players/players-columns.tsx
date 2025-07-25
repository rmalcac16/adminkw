import { Badge } from '@/components/ui/badge';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { PlayerData } from '@/types/player';
import { formatDate } from '@/utils/dates';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

export function getPlayerColumns(): ColumnDef<PlayerData>[] {
    return [
        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'server',
            header: 'Servidor',
            cell: ({ row }) => <Badge variant="secondary">{row.original.server?.title || '—'}</Badge>,
        },
        {
            accessorKey: 'languaje',
            header: 'Idioma',
            cell: ({ getValue }) => {
                const lang = getValue<number>();

                const langMap: Record<number, { label: string; gradient: string }> = {
                    0: {
                        label: 'Subtitulado',
                        gradient: 'bg-[linear-gradient(to_right,white_0%,white_50%,#bc002d_50%,#bc002d_100%)]',
                    },
                    1: {
                        label: 'Español Latino',
                        gradient: 'bg-[linear-gradient(to_right,#006847_0%,white_50%,#ce1126_100%)]',
                    },
                    2: {
                        label: 'Castellano',
                        gradient: 'bg-[linear-gradient(to_right,#aa151b_0%,#f1bf00_50%,#aa151b_100%)]',
                    },
                };

                const language = langMap[lang] ?? {
                    label: 'Desconocido',
                    gradient: 'bg-[linear-gradient(to_right,#ccc,#eee)]',
                };

                return (
                    <span className={`relative inline-block text-sm font-medium`}>
                        <span className="relative z-10 text-xs">{language.label}</span>
                        <span
                            className={`absolute bottom-0 left-0 h-[2px] w-full ${language.gradient} bg-[length:100%_2px] bg-no-repeat`}
                            aria-hidden="true"
                        />
                    </span>
                );
            },
        },
        {
            accessorKey: 'code',
            header: 'Código',
            cell: ({ row, getValue }) => {
                const url = getValue<string>();
                let serverEmbed = row.original.server?.embed ?? '—';
                serverEmbed = serverEmbed.replace(/\/+$/, '');
                const urlCode = serverEmbed + '/e/' + url;
                return (
                    <ContextMenu>
                        <ContextMenuTrigger>
                            <Badge variant="secondary" className="line-clamp-1 max-w-[260px] truncate overflow-hidden">
                                {urlCode}
                            </Badge>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                            <ContextMenuItem
                                inset
                                onClick={() => {
                                    navigator.clipboard.writeText(urlCode);
                                    toast.success('Copiado al portapapeles');
                                }}
                            >
                                Copiar enlace
                            </ContextMenuItem>
                            <ContextMenuItem inset onClick={() => window.open(urlCode, '_blank')}>
                                Abrir en una nueva pestaña
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                );
            },
        },
        {
            accessorKey: 'code_backup',
            header: 'Código de respaldo',
            cell: ({ row, getValue }) => {
                const urlCode = getValue<string>() || '—';
                return (
                    <ContextMenu>
                        <ContextMenuTrigger>
                            <Badge variant="outline" className="line-clamp-1 max-w-[240px] truncate overflow-hidden">
                                {urlCode}
                            </Badge>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                            <ContextMenuItem
                                inset
                                onClick={() => {
                                    navigator.clipboard.writeText(urlCode);
                                    toast.success('Enlace copiado al portapapeles');
                                }}
                            >
                                Copiar enlace
                            </ContextMenuItem>
                            <ContextMenuItem inset onClick={() => window.open(urlCode, '_blank')}>
                                Abrir en una nueva pestaña
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Creación',
            cell: ({ getValue }) => <span className="text-xs text-muted-foreground">{formatDate(getValue<string>())}</span>,
        },
        {
            accessorKey: 'updated_at',
            header: 'Actualización',
            cell: ({ getValue }) => <span className="text-xs text-muted-foreground">{formatDate(getValue<string>())}</span>,
        },
        {
            id: 'actions',
            header: 'Acciones',
        },
    ];
}
