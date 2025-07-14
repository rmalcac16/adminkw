import { Badge } from '@/components/ui/badge';
import { UserData } from '@/types/user';
import { formatDate } from '@/utils/dates';
import { shortenText } from '@/utils/text';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XIcon } from 'lucide-react';
import { TogglePremium } from './partials/TogglePremiumUser';

export function getUserColumns(__: (key: string) => string): ColumnDef<UserData>[] {
    return [
        {
            accessorKey: 'id',
            header: __('users.table.id'),
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'name',
            header: __('users.table.name'),
            cell: ({ getValue }) => <div className="max-w-[200px] truncate font-medium">{shortenText(getValue<string>())}</div>,
        },
        {
            accessorKey: 'email',
            header: __('users.table.email'),
            cell: ({ getValue }) => <div className="max-w-[240px] truncate text-sm text-muted-foreground">{getValue<string>()}</div>,
        },
        {
            accessorKey: 'isPremium',
            header: __('users.table.premium'),
            cell: ({ row }) => {
                const value = row.getValue<boolean>('isPremium');
                return <TogglePremium isPremium={value} userId={row.original.id} />;
            },
        },
        {
            accessorKey: 'email_verified_at',
            header: __('users.table.verified'),
            cell: ({ getValue }) => {
                const verified = !!getValue<string | null>();
                return (
                    <Badge className={verified ? 'bg-blue-600' : 'bg-yellow-600'}>
                        {verified ? (
                            <>
                                <CheckIcon />
                                {__('users.labels.verified')}
                            </>
                        ) : (
                            <>
                                <XIcon />
                                {__('users.labels.not_verified')}
                            </>
                        )}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: __('users.table.created_at'),
            cell: ({ getValue }) => {
                const date = getValue<string>();
                return <span className="text-sm">{formatDate(date)}</span>;
            },
        },
        {
            id: 'actions',
            header: __('users.table.actions'),
        },
    ];
}
