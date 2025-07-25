import { Head, usePage } from '@inertiajs/react';
import { Edit2, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import ClearCacheButton from '@/components/clear-cache-button';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

import { getEpisodeColumns } from './episode-columns';
import DialogDeleteEpisode from './partials/DialogDeleteEpisode';
import { DialogFormEpisode } from './partials/DialogFormEpisode';
import { DialogGenerateEpisodesPlayers } from './partials/DialogGenerateEpisodesPlayers';

import type { BreadcrumbItem } from '@/types';
import type { AnimeData } from '@/types/anime';
import type { EpisodeData } from '@/types/episode';
import type { ServerData } from '@/types/server';

import { shortenText } from '@/utils/text';

interface Props {
    anime: AnimeData;
    episodes: EpisodeData[];
    servers: ServerData[];
}

export default function Index({ anime, episodes, servers }: Props) {
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    const [modals, setModals] = useState({
        create: false,
        generatePlayers: false,
        edit: { open: false, episode: null as EpisodeData | null },
        delete: { open: false, episode: null as EpisodeData | null },
    });

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const handleModal = useCallback((key: keyof typeof modals, value: boolean, episode?: EpisodeData | null) => {
        setModals((prev) => ({
            ...prev,
            [key]: typeof episode === 'undefined' ? value : { open: value, episode },
        }));
    }, []);

    const renderActionsCell = useCallback(
        ({ row }: any) => {
            const episode = row.original as EpisodeData;
            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="size-8" onClick={() => handleModal('edit', true, episode)}>
                        <Edit2 />
                    </Button>
                    <Button variant="destructive" size="icon" className="size-8" onClick={() => handleModal('delete', true, episode)}>
                        <Trash2 />
                    </Button>
                </div>
            );
        },
        [handleModal],
    );

    const columns = useMemo(() => {
        return getEpisodeColumns(anime).map((col) => (col.id === 'actions' ? { ...col, cell: renderActionsCell } : col));
    }, [anime, renderActionsCell]);

    const filterFields = useMemo(() => [{ field: 'number', label: 'número' }], []);

    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => [
            {
                title: 'Animes',
                href: route().has('animes.index') ? route('animes.index') : '#',
            },
            {
                title: shortenText(anime.name),
                href: route().has('episodes.index') ? route('episodes.index', { anime: anime.id }) : '#',
            },
        ],
        [anime],
    );

    const episodeNumberDefault = useMemo(() => (episodes.length > 0 ? Math.max(...episodes.map((e) => e.number)) + 1 : 1), [episodes]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Episodios de ${anime.name}`} />

            <div className="space-y-6 p-4">
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    <div>
                        <h1 className="text-2xl font-semibold">Episodios</h1>
                        <p className="text-sm text-muted-foreground">Lista de episodios para el anime "{anime.name}".</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
                        <Button onClick={() => handleModal('create', true)}>Crear episodio</Button>
                        <Button variant="outline" onClick={() => handleModal('generatePlayers', true)}>
                            Generar reproductores
                        </Button>
                        <ClearCacheButton routeName="cache.episodes.clear" labelKey="episodes" routeParams={{ anime: anime.id }} />
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={episodes}
                            filterFields={filterFields}
                            pageSizeKey="episodes_page_size"
                            getRowLink={(episode) => route('players.index', { anime: episode.anime_id, episode: episode.id })}
                        />
                    </CardContent>
                </Card>
            </div>

            <DialogFormEpisode
                anime={anime}
                episodeNumberDefault={episodeNumberDefault}
                open={modals.create}
                setOpen={(open) => handleModal('create', open)}
            />

            <DialogFormEpisode
                anime={anime}
                episode={modals.edit.episode || undefined}
                open={modals.edit.open}
                setOpen={(open) => handleModal('edit', open)}
            />

            <DialogGenerateEpisodesPlayers
                anime={anime}
                servers={servers}
                open={modals.generatePlayers}
                setOpen={(open) => handleModal('generatePlayers', open)}
            />

            {modals.delete.episode && (
                <DialogDeleteEpisode
                    anime={anime}
                    episode={modals.delete.episode}
                    open={modals.delete.open}
                    setOpen={(open) => handleModal('delete', open)}
                />
            )}
        </AppLayout>
    );
}
