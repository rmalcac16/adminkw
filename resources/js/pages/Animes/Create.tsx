import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Card, CardContent } from '@/components/ui/card';
import { GenreData } from '@/types/genre';
import { AnimeForm } from './anime-form';

export default function Create({ genres }: { genres: GenreData[] }) {
    const { __ } = useLang();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('animes.breadcrumb.index'),
            href: route().has('animes.index') ? route('animes.index') : '#',
        },
        { title: __('animes.breadcrumb.create'), href: route().has('animes.create') ? route('animes.create') : '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('animes.create_page.title')} />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">{__('animes.create_page.title')}</h1>
                        <p className="text-sm text-muted-foreground">{__('animes.create_page.description')}</p>
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <AnimeForm genres={genres} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
