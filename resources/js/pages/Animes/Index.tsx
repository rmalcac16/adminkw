import { Head, Link, router, usePage } from '@inertiajs/react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import { Plus } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { toast } from 'sonner';
import { getAnimeColumns } from './anime-columns';
import { AnimeDialogGenerate } from './anime-dialog-generate';

export default function Index({ animes, filters }: any) {
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    const { __ } = useLang();
    const columns = React.useMemo(() => getAnimeColumns(__), [__]);

    const initialSearch = filters?.search ?? '';
    const [search, setSearch] = React.useState(initialSearch);

    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const [animeDialogOpen, setAnimeDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if (search === initialSearch) return;

        const delayDebounce = setTimeout(() => {
            router.get(route('animes.index'), { search }, { preserveState: true, replace: true });
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const breadcrumbs = [
        {
            title: __('animes.breadcrumb.index'),
            href: route('animes.index'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('animes.index_page.title')} />
            <div className="space-y-6 p-2 lg:p-4">
                <div className="grid grid-cols-1 items-center justify-between gap-4 sm:grid-cols-2">
                    <div className="space-y-1 text-center sm:text-left">
                        <h1 className="text-2xl font-semibold">{__('animes.index_page.title')}</h1>
                        <p className="text-sm text-muted-foreground">{__('animes.index_page.description')}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 sm:justify-end">
                        <Button asChild>
                            <Link href={route().has('animes.create') ? route('animes.create') : '#'}>
                                <Plus /> {__('animes.buttons.add')}
                            </Link>
                        </Button>
                        <AnimeDialogGenerate open={animeDialogOpen} setOpen={setAnimeDialogOpen} />
                    </div>
                </div>

                <Card>
                    <CardContent className="space-y-4 p-2 md:p-4">
                        <div className="flex items-center gap-2">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={__('common.placeholders.search_multiple', {
                                    fields: ['name', 'name_alternative'].map((field) => __('animes.labels.' + field)).join(', '),
                                })}
                                className="max-w-sm"
                            />
                        </div>

                        <DataTable columns={columns} data={animes.data} enableClientPagination={false} enableClientFiltering={false} />

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                {__('pagination.page_info', {
                                    current: animes.current_page,
                                    total: animes.last_page,
                                })}
                            </span>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        router.get(
                                            route('animes.index'),
                                            {
                                                search,
                                                page: animes.current_page - 1,
                                            },
                                            { preserveState: true },
                                        )
                                    }
                                    disabled={animes.current_page <= 1}
                                >
                                    {__('pagination.previous')}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        router.get(
                                            route('animes.index'),
                                            {
                                                search,
                                                page: animes.current_page + 1,
                                            },
                                            { preserveState: true },
                                        )
                                    }
                                    disabled={animes.current_page >= animes.last_page}
                                >
                                    {__('pagination.next')}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
