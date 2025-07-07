import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimeData } from '@/types/anime';
import { GenreData } from '@/types/genre';
import { AnimeForm } from './anime-form';

export default function Edit({ genres, anime }: { genres: GenreData[]; anime: AnimeData }) {
    const { __ } = useLang();

    function shortenName(name: string): string {
        const words = name.split(' ');
        if (words.length <= 10) return name;
        return [...words.slice(0, 3), '......', ...words.slice(-3)].join(' ');
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('animes.breadcrumb.index'),
            href: route().has('animes.index') ? route('animes.index') : '#',
        },
        { title: shortenName(anime.name), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('animes.edit_page.title')} />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-semibold">{__('animes.edit_page.title')}</h1>
                            <Badge variant="secondary">{anime.name}</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">{__('animes.edit_page.description')}</p>
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <AnimeForm type="edit" anime={anime} genres={genres} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
