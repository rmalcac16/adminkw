'use client';

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
import { Check, Loader2, RotateCcw, Search } from 'lucide-react';
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

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [rawResponse, setRawResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [hasSynced, setHasSynced] = useState(false);
    const [malIdInput, setMalIdInput] = useState('');

    useEffect(() => {
        if (search.length < 3 || hasSynced || !isOpen) {
            setRawResponse(null);
            return;
        }

        const timer = setTimeout(() => {
            setLoading(true);
            fetch(route('mal.search') + '?q=' + encodeURIComponent(search))
                .then((res) => res.json())
                .then(setRawResponse)
                .catch((err) => {
                    console.error('Error buscando en MAL:', err);
                    setRawResponse({ error: true });
                })
                .finally(() => setLoading(false));
        }, 600);

        return () => clearTimeout(timer);
    }, [search, hasSynced, isOpen]);

    const handleSelect = (item: any) => {
        const parsed = parseMalAnime(item.node, genres);
        setData?.((prev: any) => ({ ...prev, ...parsed }));
        toast.success(__('animes.sync_mal.synced_successfully'), { icon: <Check /> });
        setHasSynced(true);
        setIsOpen(false);
    };

    const handleManualId = async () => {
        const id = parseInt(malIdInput.trim(), 10);
        if (!id || isNaN(id)) {
            toast.error(__('animes.sync_mal.invalid_id'));
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(route('mal.show', { id }));
            if (!res.ok) throw new Error('Not found');
            const data = await res.json();
            const parsed = parseMalAnime(data, genres);
            setData?.((prev: any) => ({ ...prev, ...parsed }));
            toast.success(__('animes.sync_mal.synced_successfully'), { icon: <Check /> });
            setHasSynced(true);
            setIsOpen(false);
        } catch {
            toast.error(__('animes.sync_mal.not_found_id'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (open) {
                    setRawResponse(null);
                    setHasSynced(false);
                    setSearch(anime?.name ?? '');
                    setMalIdInput('');
                }
            }}
        >
            <DialogTrigger asChild>
                <div className="flex h-full items-end justify-end">
                    <Button type="button" variant="secondary">
                        <RotateCcw />
                        MAL
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-5xl">
                <DialogHeader>
                    <DialogTitle>{__('animes.sync_mal.title')}</DialogTitle>
                    <DialogDescription>{__('animes.sync_mal.description')}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setHasSynced(false);
                            }}
                            placeholder={__('animes.sync_mal.search_placeholder')}
                            className="min-w-[200px] flex-1 text-sm"
                        />
                        <Input
                            type="number"
                            value={malIdInput}
                            onChange={(e) => setMalIdInput(e.target.value)}
                            placeholder={__('animes.sync_mal.enter_mal_id')}
                            className="w-[180px]"
                            onKeyDown={(e) => e.key === 'Enter' && handleManualId()}
                        />
                        <Button size="icon" onClick={handleManualId} disabled={!malIdInput.trim() || isNaN(Number(malIdInput))}>
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-6 text-muted-foreground">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {__('animes.sync_mal.loading')}
                        </div>
                    ) : rawResponse?.data?.length > 0 ? (
                        <ScrollArea className="h-[400px] pr-1">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {rawResponse.data.map(({ node }: any) => {
                                    const year = node.start_date?.split('-')[0] ?? '';
                                    const type = node.media_type?.toUpperCase();

                                    const title = node.title.toLowerCase();
                                    const keyword = search.toLowerCase().trim();
                                    const isRelevant = title === keyword || title.includes(keyword) || keyword.includes(title);

                                    return (
                                        <div
                                            key={node.id}
                                            className="relative cursor-pointer overflow-hidden rounded-lg border transition hover:shadow-md"
                                            onClick={() => handleSelect({ node })}
                                        >
                                            <div className="relative h-48 bg-muted">
                                                {node.main_picture?.medium ? (
                                                    <img
                                                        src={node.main_picture.medium}
                                                        alt={node.title}
                                                        className="h-full w-full object-cover opacity-80"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                                        Sin imagen
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-background/100" />

                                                {type && (
                                                    <div className="absolute top-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white">
                                                        {type}
                                                    </div>
                                                )}
                                                {year && (
                                                    <div className="absolute top-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white">
                                                        {year}
                                                    </div>
                                                )}
                                                {isRelevant && (
                                                    <div className="absolute bottom-2 left-2 rounded bg-primary px-2 py-0.5 text-[10px] text-white shadow">
                                                        Relevante
                                                    </div>
                                                )}
                                            </div>

                                            <div className="line-clamp-2 h-10 p-2 text-xs leading-snug">{node.title}</div>
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
