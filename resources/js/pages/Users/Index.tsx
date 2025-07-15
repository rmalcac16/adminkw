import { Head, router, usePage } from '@inertiajs/react';
import * as React from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/data-table';
import PaginationWrapper from '@/components/pagination-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';

import { KeyRound, MailCheck } from 'lucide-react';
import DialogChangeEmail from './partials/DialogChangeEmail';
import DialogChangePassword from './partials/DialogChangePassword';
import DeleteUserDialog from './partials/DialogDeleteUser';
import UserKpis from './partials/UserKpis';
import { getUserColumns } from './user-columns';

export default function Index({ users, filters, kpis }: any) {
    const { __ } = useLang();
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    const [modals, setModals] = React.useState({
        email: { open: false, user: null },
        password: { open: false, user: null },
    });

    const [search, setSearch] = React.useState(filters?.search ?? '');
    const lastSearchRef = React.useRef(search);

    const openModal = (type: 'email' | 'password', user: any) => {
        setModals((prev) => ({
            ...prev,
            [type]: { open: true, user },
        }));
    };

    const columns = React.useMemo(() => {
        const baseColumns = getUserColumns(__);
        return baseColumns.map((col) =>
            col.id === 'actions'
                ? {
                      ...col,
                      cell: ({ row }: any) => {
                          const user = row.original;
                          return (
                              <div className="flex gap-2">
                                  <Button variant="outline" size="icon" className="size-8" onClick={() => openModal('email', user)}>
                                      <MailCheck />
                                  </Button>
                                  <Button variant="outline" size="icon" className="size-8" onClick={() => openModal('password', user)}>
                                      <KeyRound />
                                  </Button>
                                  <DeleteUserDialog user={user} />
                              </div>
                          );
                      },
                  }
                : col,
        );
    }, [__]);

    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    React.useEffect(() => {
        lastSearchRef.current = filters?.search ?? '';
        setSearch(filters?.search ?? '');
    }, [filters?.search]);

    React.useEffect(() => {
        if (search === lastSearchRef.current) return;

        const delay = setTimeout(() => {
            router.get(route('users.index'), { search }, { preserveState: true, replace: true });
            lastSearchRef.current = search;
        }, 300);

        return () => clearTimeout(delay);
    }, [search]);

    const breadcrumbs = [{ title: __('users.breadcrumb.index'), href: route('users.index') }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('users.index_page.title')} />
            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">{__('users.index_page.title')}</h1>
                    <p className="text-sm text-muted-foreground">{__('users.index_page.description')}</p>
                </div>

                <UserKpis kpis={kpis} />

                <Card>
                    <CardContent className="space-y-4">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={__('common.placeholders.search_multiple', {
                                fields: ['name', 'email'].map((field) => __('users.fields.' + field)).join(', '),
                            })}
                            className="max-w-sm"
                        />
                        <DataTable columns={columns} data={users.data} enableClientPagination={false} enableClientFiltering={false} />
                        <PaginationWrapper links={users.links} />
                    </CardContent>
                </Card>
            </div>

            <DialogChangeEmail
                open={modals.email.open}
                setOpen={(open) => setModals((prev) => ({ ...prev, email: { ...prev.email, open } }))}
                user={modals.email.user}
            />
            <DialogChangePassword
                open={modals.password.open}
                setOpen={(open) => setModals((prev) => ({ ...prev, password: { ...prev.password, open } }))}
                user={modals.password.user}
            />
        </AppLayout>
    );
}
