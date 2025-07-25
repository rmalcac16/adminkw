import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { AnimeData } from '@/types/anime';
import { EpisodeData } from '@/types/episode';
import { AlertTriangle } from 'lucide-react';

interface Props {
    anime: AnimeData;
    episode: EpisodeData;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DialogDeleteEpisode({ anime, episode, open, setOpen }: Props) {
    const form = useForm({});

    const handleDelete = () => {
        form.delete(
            route('episodes.destroy', {
                anime: episode.anime_id,
                episode: episode.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Eliminar episodio
                    </DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que deseas eliminar el episodio <span className="font-semibold">#{episode.number}</span> de{' '}
                        <span className="font-semibold">{anime.name}</span>? Esta acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild disabled={form.processing}>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleDelete} disabled={form.processing} variant="destructive">
                        {form.processing ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
