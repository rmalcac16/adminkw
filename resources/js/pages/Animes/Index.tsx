import { Head, Link, router, usePage } from '@inertiajs/react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Plus } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { animeStatuses } from '@/constants/animeStatus';
import { animeTypes } from '@/constants/animeTypes';
import { toast } from 'sonner';
import { getAnimeColumns } from './anime-columns';
import { AnimeDialogGenerate } from './anime-dialog-generate';

export default function Index({ animes, filters }: any) {
    const { props } = usePage();
    const flashMessages = props.flash as { success?: string; error?: string };

    const columns = React.useMemo(() => getAnimeColumns(), []);

    // Initial filters
    const initialSearch = filters?.search ?? '';
    const initialStatus = filters?.status ?? 'all';
    const initialType = filters?.type ?? 'all';

    const [search, setSearch] = React.useState(initialSearch);
    const [status, setStatus] = React.useState(initialStatus);
    const [type, setType] = React.useState(initialType);

    // Show flash messages
    React.useEffect(() => {
        if (flashMessages.success) toast.success(flashMessages.success);
        if (flashMessages.error) toast.error(flashMessages.error);
    }, [flashMessages]);

    // Control dialog state
    const [isAnimeDialogOpen, setIsAnimeDialogOpen] = React.useState(false);

    // Debounce search + filters
    React.useEffect(() => {
        if (search === initialSearch && status === initialStatus && type === initialType) return;

        const delay = setTimeout(() => {
            router.get(
                route('animes.index'),
                {
                    search,
                    status: status === 'all' ? '' : status,
                    type: type === 'all' ? '' : type,
                },
                { preserveState: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(delay);
    }, [search, status, type]);

    // Reset filters
    const handleClearFilters = () => {
        setSearch('');
        setStatus('all');
        setType('all');
        router.get(route('animes.index'), {}, { preserveState: false, replace: true });
    };

    const breadcrumbs = [
        {
            title: 'Lista de animes',
            href: route('animes.index'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de animes" />
            <div className="space-y-6 p-2 lg:p-4">
                {/* Encabezado */}
                <div className="grid grid-cols-1 items-center justify-between gap-4 sm:grid-cols-2">
                    <div className="space-y-1 text-center sm:text-left">
                        <h1 className="text-2xl font-semibold">Lista de animes</h1>
                        <p className="text-sm text-muted-foreground">Aquí puedes ver y gestionar todos los animes disponibles.</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 sm:justify-end">
                        <Button asChild>
                            <Link href={route().has('animes.create') ? route('animes.create') : '#'}>
                                <Plus /> Agregar anime
                            </Link>
                        </Button>
                        <AnimeDialogGenerate open={isAnimeDialogOpen} setOpen={setIsAnimeDialogOpen} />
                    </div>
                </div>

                {/* Tabla de animes */}
                <Card>
                    <CardContent className="space-y-4 p-2 md:p-4">
                        {/* Campo de búsqueda y filtros */}
                        <div className="flex items-center justify-between gap-2">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar por nombre o nombre alternativo"
                                className="max-w-sm"
                            />
                            <div className="flex items-center gap-2">
                                {/* Filtro estado */}
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Selecciona un estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {animeStatuses.map((statusOption) => (
                                            <SelectItem key={statusOption.key} value={statusOption.value}>
                                                {statusOption.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Filtro tipo */}
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Selecciona un tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {animeTypes.map((typeOption) => (
                                            <SelectItem key={typeOption.key} value={typeOption.value}>
                                                {typeOption.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {(search || status !== 'all' || type !== 'all') && (
                                    <Button size="sm" onClick={handleClearFilters}>
                                        Quitar filtros
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Tabla */}
                        <DataTable
                            columns={columns}
                            data={animes.data}
                            enableClientPagination={false}
                            enableClientFiltering={false}
                            getRowLink={(row) => route('episodes.index', { anime: row.id })}
                        />

                        {/* Paginación */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Página {animes.current_page} de {animes.last_page}
                            </span>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        router.get(
                                            route('animes.index'),
                                            {
                                                search,
                                                status: status === 'all' ? '' : status,
                                                type: type === 'all' ? '' : type,
                                                page: animes.current_page - 1,
                                            },
                                            { preserveState: true },
                                        )
                                    }
                                    disabled={animes.current_page <= 1}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        router.get(
                                            route('animes.index'),
                                            {
                                                search,
                                                status: status === 'all' ? '' : status,
                                                type: type === 'all' ? '' : type,
                                                page: animes.current_page + 1,
                                            },
                                            { preserveState: true },
                                        )
                                    }
                                    disabled={animes.current_page >= animes.last_page}
                                >
                                    Siguiente
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
