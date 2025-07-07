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
import { GenreData } from '@/types/genre';
import { parseMalAnime } from '@/utils/parseMalAnime';
import { Check, LoaderIcon, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

type Props = {
    anime?: any;
    setData?: (data: any) => void;
    genres: GenreData[];
};

export function AnimeDialogSyncMal({ anime, setData, genres }: Props) {
    const { __ } = useLang();

    const [search, setSearch] = useState('');
    const [rawResponse, setRawResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [hasSynced, setHasSynced] = useState(false);

    useEffect(() => {
        if (anime?.name) {
            setSearch(anime.name);
        }
    }, [anime]);

    useEffect(() => {
        if (search.length < 3) {
            setRawResponse(null);
            return;
        }

        if (hasSynced) return;

        const timer = setTimeout(() => {
            setLoading(true);
            fetch(route('mal.search') + '?q=' + encodeURIComponent(search))
                .then((res) => res.json())
                .then((json) => {
                    setRawResponse(json);
                })
                .catch((err) => {
                    console.error('Error al buscar en MAL:', err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 600);

        return () => clearTimeout(timer);
    }, [search, hasSynced]);

    const handleSelect = (item: any) => {
        const parsed = parseMalAnime(item.node, genres);
        setData?.((prev: any) => ({
            ...prev,
            ...parsed,
        }));
        toast.success(__('animes.sync_mal.synced_successfully'), {
            icon: <Check />,
        });
        setHasSynced(true);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex h-full items-end justify-center">
                    <Button type="button" variant="secondary" className="flex-1">
                        <RotateCcw />
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
                <DialogHeader>
                    <DialogTitle>{__('animes.sync_mal.title')}</DialogTitle>
                    <DialogDescription>{__('animes.sync_mal.description')}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <Input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setHasSynced(false);
                        }}
                        placeholder={__('animes.sync_mal.search_placeholder')}
                    />

                    {loading ? (
                        <div className="flex items-center justify-center py-6 text-muted-foreground">
                            <LoaderIcon className="h-5 w-5 animate-spin" />
                            <span className="ml-2">{__('animes.sync_mal.loading')}</span>
                        </div>
                    ) : rawResponse?.data ? (
                        <ScrollArea className="h-96 pr-1">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {rawResponse.data.map((item: any) => {
                                    const node = item.node;
                                    const year = node.start_date?.split('-')[0] || '----';
                                    const type = node.media_type?.toUpperCase();

                                    return (
                                        <div
                                            key={node.id}
                                            className="relative cursor-pointer overflow-hidden rounded-lg border p-2 shadow-sm transition hover:shadow-md"
                                            onClick={() => handleSelect(item)}
                                        >
                                            <div className="relative h-[150px] w-full overflow-hidden rounded bg-muted">
                                                {node.main_picture?.medium ? (
                                                    <img src={node.main_picture.medium} alt={node.title} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                                        Sin imagen
                                                    </div>
                                                )}

                                                {type && (
                                                    <span className="absolute top-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white uppercase">
                                                        {type}
                                                    </span>
                                                )}

                                                {year && (
                                                    <span className="absolute top-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white">
                                                        {year}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-2 line-clamp-2 text-xs text-foreground">{node.title}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                            {search.length >= 3 ? __('animes.sync_mal.no_results') : __('animes.sync_mal.search_hint')}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">{__('common.cancel')}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
