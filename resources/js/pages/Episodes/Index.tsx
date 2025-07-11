import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import ClearCacheButton from '@/components/clear-cache-button';
import { DataTable } from '@/components/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { AnimeData } from '@/types/anime';
import { EpisodeData } from '@/types/episode';
import { shortenText } from '@/utils/text';
import React from 'react';
import { toast } from 'sonner';
import { getEpisodeColumns } from './episode-columns';
import { EpisodeDialogForm } from './episode-dialog-form';

export default function Index({ anime, episodes }: { anime: AnimeData; episodes: EpisodeData[] }) {
    const { __ } = useLang();

    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const columns = React.useMemo(() => getEpisodeColumns(__, anime), [__, anime]);

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
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">{__('episodes.index_page.title')}</h1>
                        <p className="text-sm text-muted-foreground">{__('episodes.index_page.description', { anime: anime.name })}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <EpisodeDialogForm anime={anime} />
                        <ClearCacheButton routeName="cache.episodes.clear" labelKey="episodes" routeParams={{ anime: anime.id }} />
                    </div>
                </div>
                <Card>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={episodes}
                            filterFields={['number']}
                            getRowLink={(episode) => route('players.index', { anime: episode.anime_id, episode: episode.id })}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
