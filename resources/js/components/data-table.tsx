'use client';

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLang } from '@/hooks/useLang';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterFields?: string[];

    enableClientPagination?: boolean;
    enableClientSorting?: boolean;
    enableClientFiltering?: boolean;

    getRowLink?: (row: TData) => string | undefined;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterFields = [],
    enableClientPagination = true,
    enableClientSorting = true,
    enableClientFiltering = true,
    getRowLink,
}: DataTableProps<TData, TValue>) {
    const { __ } = useLang();

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState('');

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: enableClientPagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: enableClientSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: enableClientFiltering ? getFilteredRowModel() : undefined,
        globalFilterFn: (row: Row<TData>, _columnId: string, filterValue: string) => {
            if (!filterFields.length) return true;

            return filterFields.some((field) => {
                const value = row.getValue(field);
                return String(value).toLowerCase().includes(filterValue.toLowerCase());
            });
        },
    });

    const placeholder = React.useMemo(() => {
        if (!filterFields.length) return __('common.placeholders.search', { field: '...' });

        if (filterFields.length === 1) {
            return __('common.placeholders.search', {
                field: __('common.fields.' + filterFields[0]),
            });
        }

        return __('common.placeholders.search_multiple', {
            fields: filterFields.map((field) => __('common.fields.' + field)).join(', '),
        });
    }, [filterFields, __]);

    return (
        <div className="space-y-4">
            {enableClientFiltering && (
                <div className="flex items-center">
                    <Input
                        placeholder={placeholder}
                        value={globalFilter}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="max-w-sm"
                    />
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
                                    <TableRow
                                        key={row.id}
                                        onClick={() => rowLink && (window.location.href = rowLink)}
                                        className={rowLink ? 'cursor-pointer transition-colors hover:bg-muted/50' : ''}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                onClick={(e) => {
                                                    // Evita que los botones de acción activen el click del row
                                                    if (cell.column.id === 'actions') e.stopPropagation();
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {__('common.tables.no_data')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {enableClientPagination && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {__('pagination.page_info', {
                            current: table.getState().pagination.pageIndex + 1,
                            total: table.getPageCount(),
                        })}
                    </div>

                    <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            {__('pagination.previous')}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            {__('pagination.next')}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
