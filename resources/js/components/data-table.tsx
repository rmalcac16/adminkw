import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';

interface FilterField {
    field: string;
    label: string;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterFields?: FilterField[];
    enableClientPagination?: boolean;
    enableClientSorting?: boolean;
    enableClientFiltering?: boolean;
    getRowLink?: (row: TData) => string | undefined;
    pageSizeKey?: string;
    paginationOptions?: number[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterFields = [],
    enableClientPagination = true,
    enableClientSorting = true,
    enableClientFiltering = true,
    getRowLink,
    pageSizeKey,
    paginationOptions = [5, 10, 20, 50, 100],
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(() => {
        if (enableClientPagination && pageSizeKey) {
            try {
                const storedSize = localStorage.getItem(pageSizeKey);
                if (storedSize) {
                    const parsedSize = Number(storedSize);
                    if (paginationOptions.includes(parsedSize)) {
                        return parsedSize;
                    }
                }
            } catch (error) {
                console.error('Error al leer pageSize desde localStorage:', error);
            }
        }
        return paginationOptions[0] || 10;
    });

    React.useEffect(() => {
        if (enableClientPagination && pageSizeKey) {
            try {
                localStorage.setItem(pageSizeKey, String(pageSize));
            } catch (error) {
                console.error('Error al guardar pageSize en localStorage:', error);
            }
        }
    }, [pageSize, pageSizeKey, enableClientPagination]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newPagination = updater({ pageIndex, pageSize });
                setPageIndex(newPagination.pageIndex);
                setPageSize(newPagination.pageSize);
            } else {
                setPageIndex(updater.pageIndex);
                setPageSize(updater.pageSize);
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: enableClientPagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: enableClientSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: enableClientFiltering ? getFilteredRowModel() : undefined,
        globalFilterFn: (row: Row<TData>, _columnId: string, filterValue: string) => {
            if (!filterFields.length) return true;
            return filterFields.some(({ field }) => {
                const value = row.getValue(field);
                return String(value).toLowerCase().includes(filterValue.toLowerCase());
            });
        },
    });

    React.useEffect(() => {
        table.setPageSize(pageSize);
    }, [pageSize, table]);

    React.useEffect(() => {
        setPageIndex(0);
    }, [globalFilter]);

    const placeholder = React.useMemo(() => {
        if (!filterFields.length) return 'Buscar...';
        if (filterFields.length === 1) {
            return `Buscar por ${filterFields[0].label}...`;
        }
        return `Buscar por ${filterFields.map((f) => f.label).join(', ')}...`;
    }, [filterFields]);

    return (
        <div className="space-y-4">
            {(enableClientFiltering || enableClientPagination) && (
                <div className="flex items-center justify-between gap-2">
                    {enableClientFiltering && (
                        <Input
                            placeholder={placeholder}
                            value={globalFilter}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="max-w-sm"
                        />
                    )}
                    {enableClientPagination && (
                        <div className="flex items-center gap-1">
                            <span>Mostrar:</span>
                            <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={pageSize} />
                                </SelectTrigger>
                                <SelectContent>
                                    {paginationOptions.map((size) => (
                                        <SelectItem key={size} value={String(size)}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-secondary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-xs font-semibold tracking-wider">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                const rowLink = getRowLink?.(row.original);
                                return (
                                    <TableRow key={row.id} className={rowLink ? 'cursor-pointer transition-colors hover:bg-muted/50' : ''}>
                                        {row.getVisibleCells().map((cell) => {
                                            const isActions = cell.column.id === 'actions';
                                            const cellContent = (
                                                <TableCell
                                                    key={cell.id}
                                                    onClick={(e) => {
                                                        if (isActions) e.stopPropagation();
                                                    }}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );

                                            // Si hay rowLink y no es la columna de acciones, envolvemos en <Link>
                                            return rowLink && !isActions ? (
                                                <Link href={rowLink} key={cell.id} className="contents">
                                                    {cellContent}
                                                </Link>
                                            ) : (
                                                cellContent
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No hay datos.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {enableClientPagination && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                        Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    </span>
                    <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            Anterior
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Siguiente
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
