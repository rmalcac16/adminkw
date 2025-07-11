import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import ClearCacheButton from '@/components/clear-cache-button';
import { DataTable } from '@/components/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { AnimeData } from '@/types/anime';
import { EpisodeData } from '@/types/episode';
import { PlayerData } from '@/types/player';
import { ServerData } from '@/types/server';
import { shortenText } from '@/utils/text';
import React from 'react';
import { toast } from 'sonner';
import { PlayerDialogForm } from './player-dialog-form';
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

    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const columns = React.useMemo(() => getPlayerColumns(__, servers), [__, servers]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('players.breadcrumb.animes'),
            href: route().has('animes.index') ? route('animes.index') : '#',
        },
        {
            title: shortenText(anime.name),
            href: route().has('episodes.index') ? route('episodes.index', { anime: anime.id }) : '#',
        },
        {
            title: __('players.breadcrumb.episode_number', { number: episode.number }),
            href: route().has('players.index') ? route('players.index', { anime: anime.id, episode: episode.id }) : '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('players.index_page.title')} />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">{__('players.index_page.title')}</h1>
                        <p className="text-sm text-muted-foreground">
                            {__('players.index_page.description', { episode: episode.number, anime: anime.name })}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <PlayerDialogForm servers={servers} animeId={anime.id} episodeId={episode.id} triggerType="button" />
                        <ClearCacheButton
                            routeName={'cache.players.clear'}
                            labelKey={'players'}
                            routeParams={{ anime: anime.id, episode: episode.id }}
                        />
                    </div>
                </div>
                <Card>
                    <CardContent>
                        <DataTable columns={columns} data={players} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
