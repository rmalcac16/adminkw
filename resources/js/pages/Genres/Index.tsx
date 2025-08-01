import * as React from 'react';

import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import ClearCacheButton from '@/components/clear-cache-button';
import { Card, CardContent } from '@/components/ui/card';
import { GenreData } from '@/types/genre';
import { DataTable } from '../../components/data-table';
import { getGenreColumns } from './genre-columns';
import { GenreDialogForm } from './genre-dialog-form';

export default function Index({ genres }: { genres: GenreData[] }) {
    const { __ } = useLang();

    const columns = React.useMemo(() => getGenreColumns(__), [__]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('genres.breadcrumb.index'),
            href: route().has('genres.index') ? route('genres.index') : '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('genres.index_page.title')} />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">{__('genres.index_page.title')}</h1>
                        <p className="text-sm text-muted-foreground">{__('genres.index_page.description')}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <GenreDialogForm />
                        <ClearCacheButton routeName="cache.genres.clear" labelKey="genres" />
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={genres}
                            filterFields={[
                                { field: 'title', label: 'título' },
                                { field: 'slug', label: 'slug' },
                                { field: 'name_mal', label: 'nombre mal' },
                            ]}
                            pageSizeKey="genres_page_size"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
