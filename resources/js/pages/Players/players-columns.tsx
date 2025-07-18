import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayerData } from '@/types/player';
import { ServerData } from '@/types/server';
import { formatDate } from '@/utils/dates';
import { ColumnDef } from '@tanstack/react-table';
import { CopyIcon, GlobeIcon } from 'lucide-react';
import { toast } from 'sonner';
import { PlayerDialogDelete } from './player-dialog-delete';
import { PlayerDialogForm } from './player-dialog-form';

export function getPlayerColumns(__: (key: string) => string, servers: ServerData[]): ColumnDef<PlayerData>[] {
    return [
        {
            accessorKey: 'id',
            header: __('players.table.id'),
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'server.name',
            header: __('players.table.server'),
            cell: ({ row }) => <Badge variant="secondary">{row.original.server?.title || '—'}</Badge>,
        },
        {
            accessorKey: 'languaje',
            header: __('players.table.language'),
            cell: ({ getValue }) => {
                const lang = getValue<number>();

                const langVariants: Record<number, { label: string; variant: 'default' | 'secondary' | 'outline'; className?: string }> = {
                    0: { label: __('players.languages.0'), variant: 'outline', className: 'bg-green-700' },
                    1: { label: __('players.languages.1'), variant: 'default', className: '' },
                    2: { label: __('players.languages.2'), variant: 'secondary', className: '' },
                };

                const language = langVariants[lang] ?? { label: 'Desconocido', variant: 'outline' };

                return (
                    <Badge variant={language.variant} className={language.className}>
                        <GlobeIcon className="mr-1 h-4 w-4" />
                        {language.label}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'code',
            header: __('players.table.code'),
            cell: ({ row, getValue }) => {
                const url = getValue<string>();
                let serverEmbed = row.original.server?.embed ?? '—';
                serverEmbed = serverEmbed.replace(/\/+$/, '');
                const urlCode = serverEmbed + '/e/' + url;

                const handleCopy = () => {
                    navigator.clipboard.writeText(urlCode);
                    toast.success('Embed copiado al portapapeles');
                };

                return (
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="max-w-[360px] truncate">
                            {urlCode}
                        </Badge>
                        <Button size="icon" variant="ghost" onClick={handleCopy} className="size-4 cursor-pointer">
                            <CopyIcon className="text-muted-foreground" />
                        </Button>
                    </div>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: __('players.table.created_at'),
            cell: ({ getValue }) => <span className="text-sm text-muted-foreground">{formatDate(getValue<string>())}</span>,
        },
        {
            id: 'actions',
            header: __('players.table.actions'),
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <PlayerDialogForm
                        servers={servers}
                        animeId={row.original.episode.anime_id}
                        episodeId={row.original.episode.id}
                        player={row.original}
                        triggerType="icon"
                    />
                    <PlayerDialogDelete animeId={row.original.episode.anime_id} episodeId={row.original.episode.id} player={row.original} />
                </div>
            ),
        },
    ];
}
