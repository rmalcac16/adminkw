import { DataTable } from '@/components/data-table';
import PaginationWrapper from '@/components/pagination-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLang } from '@/hooks/useLang';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import * as React from 'react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { Crown, MailCheck } from 'lucide-react';
import DialogChangeEmail from './partials/DialogChangeEmail';
import DialogChangePassword from './partials/DialogChangePassword';
import DeleteUserDialog from './partials/DialogDeleteUser';
import UserKpis from './partials/UserKpis';
import { getUserColumns } from './user-columns';

export default function Index({ users, filters, kpis }: any) {
    const { __ } = useLang();
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    const [emailModalOpen, setEmailModalOpen] = React.useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);
    const [userToEditEmail, setUserToEditEmail] = React.useState(null);
    const [userToEditPassword, setUserToEditPassword] = React.useState(null);

    const [search, setSearch] = React.useState(filters?.search ?? '');
    const lastSearchRef = React.useRef(search);

    const columns = React.useMemo(() => getUserColumns(__), [__]);

    const columnsWithActions = React.useMemo(() => {
        return columns.map((col) =>
            col.id === 'actions'
                ? {
                      ...col,
                      cell: ({ row }: any) => {
                          const user = row.original;
                          return (
                              <div className="flex gap-2">
                                  <Button variant="outline" size="icon" className="size-8" onClick={() => openEmailModal(user)}>
                                      <MailCheck />
                                  </Button>
                                  <Button variant="outline" size="icon" className="size-8" onClick={() => openPasswordModal(user)}>
                                      <Crown />
                                  </Button>
                                  <DeleteUserDialog user={user} />
                              </div>
                          );
                      },
                  }
                : col,
        );
    }, [columns, __]);

    const openEmailModal = (user: any) => {
        setUserToEditEmail(user);
        setEmailModalOpen(true);
    };

    const openPasswordModal = (user: any) => {
        setUserToEditPassword(user);
        setPasswordModalOpen(true);
    };

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

        const delayDebounce = setTimeout(() => {
            router.get(
                route('users.index'),
                { search },
                {
                    preserveState: true,
                    replace: true,
                },
            );

            lastSearchRef.current = search;
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const breadcrumbs = [
        {
            title: __('users.breadcrumb.index'),
            href: route('users.index'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('users.index_page.title')} />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">{__('users.index_page.title')}</h1>
                        <p className="text-sm text-muted-foreground">{__('users.index_page.description')}</p>
                    </div>
                </div>

                <UserKpis kpis={kpis} />

                <Card>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Input
                                name="user_table_search"
                                type="search"
                                autoComplete="search-users"
                                spellCheck="false"
                                className="max-w-sm"
                                placeholder={__('tables.search_placeholder', { field: __('tables.name') })}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <DataTable columns={columnsWithActions} data={users.data} enableClientPagination={false} enableClientFiltering={false} />

                        <PaginationWrapper links={users.links} />
                    </CardContent>
                </Card>
            </div>

            <DialogChangeEmail open={emailModalOpen} setOpen={setEmailModalOpen} user={userToEditEmail} />
            <DialogChangePassword open={passwordModalOpen} setOpen={setPasswordModalOpen} user={userToEditPassword} />
        </AppLayout>
    );
}
