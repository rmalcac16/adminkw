import { Badge } from '@/components/ui/badge';
import { ServerData } from '@/types/server';
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';

export function getServerColumns(): ColumnDef<ServerData>[] {
    return [
        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ getValue }) => <span className="font-medium">{getValue<number>()}</span>,
        },
        {
            accessorKey: 'title',
            header: 'Título',
            enableColumnFilter: true,
            cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
        },
        {
            accessorKey: 'embed',
            header: 'Embed',
            cell: ({ getValue }) => {
                const embed = getValue<string>();
                return (
                    <Badge variant="secondary" className="font-mono text-xs">
                        {embed || '—'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'position',
            header: 'Posición',
            cell: ({ getValue }) => <span className="text-center">{getValue<number>() ?? '—'}</span>,
        },
        {
            accessorKey: 'status',
            header: 'Estado',
            cell: ({ getValue }) => {
                const value = getValue<number | null>();
                const isActive = value == 1;
                return (
                    <Badge variant="outline">
                        {isActive ? (
                            <>
                                <IconCircleCheckFilled className="h-4 w-4 text-green-500 dark:text-green-400" />
                                Activo
                            </>
                        ) : (
                            <>
                                <IconCircleXFilled className="h-4 w-4 text-red-500 dark:text-red-400" />
                                Inactivo
                            </>
                        )}
                    </Badge>
                );
            },
        },
        {
            id: 'visibility',
            header: 'Visibilidad',
            cell: ({ row }) => {
                const server = row.original;

                const items = [
                    {
                        active: server.show_on_web_desktop,
                        label: 'Escritorio',
                    },
                    {
                        active: server.show_on_web_mobile,
                        label: 'Móvil',
                    },
                    {
                        active: server.show_on_app,
                        label: 'App',
                    },
                ];

                return (
                    <div className="flex items-center justify-center gap-1">
                        {items.map(({ active, label }, index) => (
                            <Badge key={index} variant={'outline'}>
                                {active ? (
                                    <IconCircleCheckFilled className="h-4 w-4 text-green-500" />
                                ) : (
                                    <IconCircleXFilled className="h-4 w-4 text-red-500" />
                                )}
                                <span>{label}</span>
                            </Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'domains',
            header: 'Dominios',
            cell: ({ row }) => {
                const domains = row.original.domains ?? [];

                if (!domains.length) {
                    return <span className="text-sm text-muted-foreground">—</span>;
                }

                return (
                    <div className="flex flex-wrap gap-1">
                        {domains.map((domain: string, i: number) => (
                            <Badge key={i} variant="secondary">
                                {domain}
                            </Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: 'Acciones',
        },
    ];
}
