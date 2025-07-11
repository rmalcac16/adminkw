import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ServerData } from '@/types/server';
import { ColumnDef } from '@tanstack/react-table';
import { AppWindow, CheckIcon, Monitor, Smartphone, XCircle } from 'lucide-react';
import { ServerDialogForm } from './server-dialog-form';

export function getServerColumns(__: (key: string) => string): ColumnDef<ServerData>[] {
    return [
        {
            accessorKey: 'id',
            header: __('servers.table.id'),
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'title',
            header: __('servers.table.title'),
            enableColumnFilter: true,
            cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'embed',
            header: __('servers.table.embed'),
            cell: ({ getValue }) => {
                const embed = getValue<string>();
                return <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-xs">{embed || '—'}</code>;
            },
        },
        {
            accessorKey: 'position',
            header: __('servers.table.position'),
            cell: ({ getValue }) => <span className="text-center">{getValue<number>() ?? '—'}</span>,
        },
        {
            accessorKey: 'status',
            header: __('servers.table.status'),
            cell: ({ getValue }) => {
                const value = getValue<number | null>();
                const isActive = value == 1;
                return (
                    <Badge variant={isActive ? 'default' : 'outline'} className={isActive ? 'bg-green-700 text-white' : 'bg-red-100 text-red-700'}>
                        {isActive ? (
                            <>
                                <CheckIcon />
                                {__('servers.statuses.active')}
                            </>
                        ) : (
                            <>
                                <XCircle />
                                {__('servers.statuses.inactive')}
                            </>
                        )}
                    </Badge>
                );
            },
        },
        {
            id: 'visibility',
            header: __('servers.table.visibility'),
            cell: ({ row }) => {
                const server = row.original;

                const items = [
                    {
                        active: server.show_on_web_desktop,
                        label: __('servers.table.web_desktop'),
                        icon: Monitor,
                    },
                    {
                        active: server.show_on_web_mobile,
                        label: __('servers.table.web_mobile'),
                        icon: Smartphone,
                    },
                    {
                        active: server.show_on_app,
                        label: __('servers.table.app'),
                        icon: AppWindow,
                    },
                ];

                return (
                    <div className="flex items-center gap-2">
                        {items.map(({ active, label, icon: Icon }, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Badge
                                        variant={active ? 'default' : 'outline'}
                                        className={active ? 'bg-green-700 text-white' : 'text-muted-foreground'}
                                    >
                                        <Icon />
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent side="top">{label}</TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'domains',
            header: __('players.table.domains'),
            cell: ({ row }) => {
                const domains = row.original.domains ?? [];

                if (!domains.length) {
                    return <span className="text-sm text-muted-foreground">—</span>;
                }

                return (
                    <div className="flex flex-wrap gap-1">
                        {domains.map((domain: string, i: number) => (
                            <Badge key={i} variant="secondary" className="cursor-pointer">
                                {domain}
                            </Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: __('servers.table.actions'),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <ServerDialogForm server={row.original} triggerType="icon" />
                </div>
            ),
        },
    ];
}
