import * as React from 'react';

import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import ClearCacheButton from '@/components/clear-cache-button';
import { Card, CardContent } from '@/components/ui/card';
import { ServerData } from '@/types/server';
import { toast } from 'sonner';
import { DataTable } from '../../components/data-table';
import { getServerColumns } from './server-columns';
import { ServerDialogForm } from './server-dialog-form';

export default function Index({ servers }: { servers: ServerData[] }) {
    const { __ } = useLang();

    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const columns = React.useMemo(() => getServerColumns(__), [__]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('servers.breadcrumb.index'),
            href: route().has('servers.index') ? route('servers.index') : '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('servers.index_page.title')} />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">{__('servers.index_page.title')}</h1>
                        <p className="text-sm text-muted-foreground">{__('servers.index_page.description')}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <ServerDialogForm />
                        <ClearCacheButton routeName="cache.servers.clear" labelKey="servers" />
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <DataTable columns={columns} data={servers} filterFields={['title', 'embed']} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
