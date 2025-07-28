import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import ClearCacheButton from '@/components/clear-cache-button';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimeData } from '@/types/anime';
import { EpisodeData } from '@/types/episode';
import { PlayerData } from '@/types/player';
import { ServerData } from '@/types/server';
import { shortenText } from '@/utils/text';
import { Edit2, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { DialogCreateMultiplePlayers } from './partials/DialogCreateMultiplePlayers';
import { DialogDeletePlayer } from './partials/DialogDeletePlayer';
import { DialogFormPlayer } from './partials/DialogFormPlayer';
import { getPlayerColumns } from './players-columns';

export default function Index({
    anime,
    episode,
    players,
    servers,
}: {
    anime: AnimeData;
    episode: EpisodeData;
    players: PlayerData[];
    servers: ServerData[];
}) {
    const { __ } = useLang();

    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    const [modals, setModals] = useState({
        create: false,
        createMultiple: false,
        edit: { open: false, player: null as PlayerData | null },
        delete: { open: false, player: null as PlayerData | null },
    });

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const handleModal = useCallback((key: keyof typeof modals, value: boolean, player?: PlayerData | null) => {
        setModals((prev) => ({
            ...prev,
            [key]: typeof player === 'undefined' ? value : { open: value, player },
        }));
    }, []);

    const renderActionsCell = useCallback(
        ({ row }: any) => {
            const player = row.original as PlayerData;
            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="size-8" onClick={() => handleModal('edit', true, player)}>
                        <Edit2 />
                    </Button>
                    <Button variant="destructive" size="icon" className="size-8" onClick={() => handleModal('delete', true, player)}>
                        <Trash2 />
                    </Button>
                </div>
            );
        },
        [handleModal],
    );

    const columns = useMemo(() => {
        return getPlayerColumns().map((col) => (col.id === 'actions' ? { ...col, cell: renderActionsCell } : col));
    }, [renderActionsCell]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Animes',
            href: route().has('animes.index') ? route('animes.index') : '#',
        },
        {
            title: shortenText(anime.name),
            href: route().has('episodes.index') ? route('episodes.index', { anime: anime.id }) : '#',
        },
        {
            title: `Episodio ${episode.number}`,
            href: route().has('players.index') ? route('players.index', { anime: anime.id, episode: episode.id }) : '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Lista de reproductores para el episodio ${episode.number} de ${anime.name}`} />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">Reproductores</h1>
                        <p className="text-sm text-muted-foreground">
                            Lista de reproductores para el episodio {episode.number} de {anime.name}.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button onClick={() => handleModal('create', true)}>Crear reproductor</Button>
                        {/* <Button variant="secondary" onClick={() => handleModal('createMultiple', true, null)}>
                            Crear reproductores
                        </Button> */}
                        <ClearCacheButton
                            routeName={'cache.players.clear'}
                            labelKey={'players'}
                            routeParams={{ anime: anime.id, episode: episode.id }}
                        />
                    </div>
                </div>
                <Card>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={players}
                            filterFields={[{ field: 'code_backup', label: 'código de respaldo' }]}
                            pageSizeKey="players_page_size"
                        />
                    </CardContent>
                </Card>
            </div>

            {modals.create && (
                <DialogFormPlayer
                    animeId={anime.id}
                    episodeId={episode.id}
                    open={modals.create}
                    setOpen={(open) => handleModal('create', open)}
                    servers={servers}
                />
            )}

            {modals.createMultiple && (
                <DialogCreateMultiplePlayers
                    animeId={anime.id}
                    episodeId={episode.id}
                    open={modals.createMultiple}
                    setOpen={(open) => handleModal('createMultiple', open)}
                    servers={servers}
                />
            )}

            {modals.edit.open && (
                <DialogFormPlayer
                    animeId={anime.id}
                    episodeId={episode.id}
                    open={modals.edit.open}
                    setOpen={(open) => handleModal('edit', open)}
                    player={modals.edit.player}
                    servers={servers}
                />
            )}

            {modals.delete.open && (
                <DialogDeletePlayer
                    animeId={anime.id}
                    episodeId={episode.id}
                    open={modals.delete.open}
                    player={modals.delete.player!}
                    setOpen={(open) => handleModal('delete', open)}
                />
            )}
        </AppLayout>
    );
}
