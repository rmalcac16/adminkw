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
import { ServerData } from '@/types/server';
import { shortenText } from '@/utils/text';
import { Edit2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { getEpisodeColumns } from './episode-columns';
import DialogDeleteEpisode from './partials/DialogDeleteEpisode';
import { DialogFormEpisode } from './partials/DialogFormEpisode';
import { DialogGenerateEpisodesPlayers } from './partials/DialogGenerateEpisodesPlayers';

export default function Index({ anime, episodes, servers }: { anime: AnimeData; episodes: EpisodeData[]; servers: ServerData[] }) {
    const { __ } = useLang();
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    const [modals, setModals] = React.useState({
        create: false,
        generatePlayers: false,
        edit: { open: false, episode: null as EpisodeData | null },
        delete: { open: false, episode: null as EpisodeData | null },
    });

    const openCreateModal = () => setModals((prev) => ({ ...prev, create: true }));
    const closeCreateModal = () => setModals((prev) => ({ ...prev, create: false }));

    const openGenerateEpisodesPlayersModal = () => setModals((prev) => ({ ...prev, generatePlayers: true }));
    const closeGenerateEpisodesPlayersModal = () => setModals((prev) => ({ ...prev, generatePlayers: false }));

    const openEditModal = (episode: EpisodeData) => setModals((prev) => ({ ...prev, edit: { open: true, episode } }));
    const closeEditModal = () => setModals((prev) => ({ ...prev, edit: { open: false, episode: null } }));

    const openDeleteModal = (episode: EpisodeData) => setModals((prev) => ({ ...prev, delete: { open: true, episode } }));
    const closeDeleteModal = () => setModals((prev) => ({ ...prev, delete: { open: false, episode: null } }));

    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const columns = React.useMemo(() => {
        const baseColumns = getEpisodeColumns(__, anime);
        return baseColumns.map((col) =>
            col.id === 'actions'
                ? {
                      ...col,
                      cell: ({ row }: any) => {
                          const episode = row.original;
                          return (
                              <div className="flex gap-2">
                                  <Button variant="outline" size="icon" className="size-8" onClick={() => openEditModal(episode)}>
                                      <Edit2 />
                                  </Button>
                                  <DialogDeleteEpisode episode={episode} />
                              </div>
                          );
                      },
                  }
                : col,
        );
    }, [__, anime]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('episodes.breadcrumb.animes'),
            href: route().has('animes.index') ? route('animes.index') : '#',
        },
        {
            title: shortenText(anime.name),
            href: route().has('episodes.index') ? route('episodes.index', { anime: anime.id }) : '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('episodes.index_page.title')} />
            <div className="space-y-6 p-4">
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">{__('episodes.index_page.title')}</h1>
                        <p className="text-sm text-muted-foreground">{__('episodes.index_page.description', { anime: anime.name })}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
                        <Button variant="outline" onClick={openGenerateEpisodesPlayersModal}>
                            {__('episodes.buttons.generate')}
                        </Button>
                        <Button onClick={openCreateModal}>{__('episodes.buttons.add')}</Button>
                        <ClearCacheButton routeName="cache.episodes.clear" labelKey="episodes" routeParams={{ anime: anime.id }} />
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <DataTable columns={columns} data={episodes} filterFields={['number']} />
                    </CardContent>
                </Card>
            </div>

            <DialogFormEpisode anime={anime} open={modals.create} setOpen={closeCreateModal} />

            <DialogFormEpisode
                anime={anime}
                episode={modals.edit.episode || undefined}
                open={modals.edit.open}
                setOpen={(open) =>
                    setModals((prev) => ({
                        ...prev,
                        edit: { ...prev.edit, open },
                    }))
                }
            />

            <DialogGenerateEpisodesPlayers
                anime={anime}
                servers={servers}
                open={modals.generatePlayers}
                setOpen={closeGenerateEpisodesPlayersModal}
            />
        </AppLayout>
    );
}
