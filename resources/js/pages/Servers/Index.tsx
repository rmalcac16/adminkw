import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import ClearCacheButton from '@/components/clear-cache-button';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ServerData } from '@/types/server';
import { Edit2, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { DialogDeleteServer } from './partials/DialogDeleteServer';
import { DialogFormServer } from './partials/DialogFormServer';
import { getServerColumns } from './server-columns';

export default function Index({ servers }: { servers: ServerData[] }) {
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    const [modals, setModals] = useState({
        create: false,
        edit: { open: false, server: null as ServerData | null },
        delete: { open: false, server: null as ServerData | null },
    });

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const handleModal = useCallback((key: keyof typeof modals, value: boolean, server?: ServerData | null) => {
        setModals((prev) => ({
            ...prev,
            [key]: typeof server === 'undefined' ? value : { open: value, server },
        }));
    }, []);

    const renderActionsCell = useCallback(
        ({ row }: any) => {
            const server = row.original as ServerData;
            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="size-8" onClick={() => handleModal('edit', true, server)}>
                        <Edit2 />
                    </Button>
                    <Button variant="destructive" size="icon" className="size-8" onClick={() => handleModal('delete', true, server)}>
                        <Trash2 />
                    </Button>
                </div>
            );
        },
        [handleModal],
    );

    const columns = useMemo(() => {
        return getServerColumns().map((col) => (col.id === 'actions' ? { ...col, cell: renderActionsCell } : col));
    }, [renderActionsCell]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Servidores',
            href: route().has('servers.index') ? route('servers.index') : '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Servidores" />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">Lista de Servidores</h1>
                        <p className="text-sm text-muted-foreground">Aquí puedes gestionar los servidores disponibles.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button onClick={() => handleModal('create', true)}>Crear servidor</Button>
                        <ClearCacheButton routeName="cache.servers.clear" labelKey="servers" />
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={servers}
                            filterFields={[
                                { field: 'title', label: 'titulo' },
                                { field: 'domains', label: 'dominio' },
                            ]}
                            pageSizeKey="servers_page_size"
                        />
                    </CardContent>
                </Card>

                {modals.create && <DialogFormServer open={modals.create} setOpen={(open) => handleModal('create', open)} />}

                {modals.edit.server && (
                    <DialogFormServer server={modals.edit.server} open={modals.edit.open} setOpen={(open) => handleModal('edit', open, null)} />
                )}

                {modals.delete.server && (
                    <DialogDeleteServer server={modals.delete.server} open={modals.delete.open} setOpen={(open) => handleModal('delete', open)} />
                )}
            </div>
        </AppLayout>
    );
}
