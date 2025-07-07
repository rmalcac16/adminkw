import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLang } from '@/hooks/useLang';
import type { AnimeData } from '@/types/anime';
import { useForm } from '@inertiajs/react';
import { Building, LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function AnimeDialogGenerate() {
    const { __ } = useLang();

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState<any>(null);
    const [importedAnimeIds, setImportedAnimeIds] = useState<number[]>([]);
    const [processingIds, setProcessingIds] = useState<number[]>([]);
    const [selectedAnime, setSelectedAnime] = useState<any | null>(null);

    const { post, data, setData, errors } = useForm<Partial<AnimeData>>({});

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        setLoading(true);
        if (debounceTimer) clearTimeout(debounceTimer);

        const timer = setTimeout(() => {
            fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=96821ae32edefecbd2270c4b46a61db0&language=es-ES&query=${encodeURIComponent(
                    query,
                )}`,
            )
                .then((res) => res.json())
                .then((json) => {
                    setResults((json.results || []).filter((r: any) => ['tv', 'movie'].includes(r.media_type)));
                })
                .catch(() => {
                    toast.error(__('tmdb.error'));
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 600);

        setDebounceTimer(timer);
    }, [query]);

    const handleSelectedAnime = (item: any) => {
        setSelectedAnime(item);

        const animeData = {
            name: item.title || item.name || '',
            overview: item.overview || '',
            tmdb_id: Number(item.id),
            poster: item.poster_path || '',
            banner: item.backdrop_path || '',
            aired: item.release_date || item.first_air_date || '',
            vote_average: item.vote_average || 0,
            popularity: parseInt(item.popularity, 10) || 0,
            type: item.media_type === 'movie' ? 'Movie' : 'TV',
            status: 0,
        };

        setData(animeData);
    };

    const handleImport = () => {
        if (data === null) {
            toast.error(__('animes.generate.noData'));
            return;
        }

        setTimeout(() => {
            post(route('animes.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(__('animes.generate.success'));
                    if (data.tmdb_id) {
                        setImportedAnimeIds((prev) => [...prev, data.tmdb_id!]);
                    }
                    setData({});
                },
                onError: () => {
                    console.error('Error importing anime:', errors);
                    const firstError = Object.values(errors)[0];
                    toast.error(firstError || __('animes.generate.failed'));
                },
            });
        }, 0);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <Building />
                    {__('animes.generate.button')}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
                <DialogHeader>
                    <DialogTitle>{__('animes.generate.title')}</DialogTitle>
                    <DialogDescription>{__('animes.generate.description')}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <Input placeholder={__('animes.generate.search_placeholder')} value={query} onChange={(e) => setQuery(e.target.value)} />

                    {loading && (
                        <div className="flex items-center justify-center py-4">
                            <LoaderIcon className="animate-spin" />
                        </div>
                    )}

                    <ScrollArea className="max-h-[400px] pr-1">
                        <div className="grid grid-cols-2 gap-4 pr-1 sm:grid-cols-4 md:grid-cols-6">
                            {results.map((item) => {
                                const title = item.title || item.name;
                                const year = (item.release_date || item.first_air_date || '').split('-')[0] || '----';
                                const type = item.media_type === 'movie' ? 'Película' : 'Serie';
                                const isImported = importedAnimeIds.includes(item.id);
                                const isProcessing = processingIds.includes(item.id);
                                const isSelected = selectedAnime?.id === item.id;

                                return (
                                    <div
                                        key={item.id}
                                        className="group relative overflow-hidden rounded border shadow-sm transition hover:shadow-md"
                                        onClick={() => handleSelectedAnime(item)}
                                    >
                                        <span className="absolute top-1 left-1 rounded bg-black/70 px-2 py-0.5 text-xs text-white">{year}</span>
                                        <span className="absolute top-1 right-1 rounded bg-primary px-2 py-0.5 text-xs text-white">{type}</span>

                                        {item.poster_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                                                alt={title}
                                                className="h-[130px] w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-[130px] w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                                                Sin imagen
                                            </div>
                                        )}

                                        <div className="p-2">
                                            <h3 className="line-clamp-2 min-h-[32px] text-xs leading-snug font-semibold">{title}</h3>
                                        </div>

                                        {isSelected && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-2 text-center">
                                                {isImported ? (
                                                    <span className="rounded bg-black/70 px-2 py-1 text-xs text-green-400">✅ Importado</span>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleImport();
                                                        }}
                                                        disabled={isProcessing}
                                                    >
                                                        {isProcessing ? __('common.processing') : __('common.generate')}
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            {__('common.cancel')}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
