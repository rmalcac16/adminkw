import { Head } from '@inertiajs/react';

import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import DashboardKpis from './partials/DashboardKpis';

export default function Index({ kpis }: any) {
    const { __ } = useLang();

    const breadcrumbs = [{ title: __('dashboard.breadcrumb.dashboard'), href: route('dashboard.index') }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('dashboard.index_page.title')} />
            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">{__('dashboard.index_page.title')}</h1>
                    <p className="text-sm text-muted-foreground">{__('dashboard.index_page.description')}</p>
                </div>
                <DashboardKpis kpis={kpis} />
            </div>
        </AppLayout>
    );
}
