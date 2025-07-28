import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlayerData } from '@/types/player';
import { useForm } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';

export function DialogDeletePlayer({
    animeId,
    episodeId,
    player,
    open,
    setOpen,
}: {
    animeId: number;
    episodeId: number;
    player: PlayerData;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const form = useForm();

    const handleDelete = () => {
        form.delete(route('players.destroy', { anime: animeId, episode: episodeId, player: player.id }), {
            onSuccess: () => {
                setOpen(false);
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <TriangleAlert className="text-destructive" />
                        Eliminar reproductor
                    </DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que deseas eliminar el reproductor {player.code}? Esta acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild disabled={form.processing}>
                        <Button variant="outline" type="button">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleDelete} disabled={form.processing} variant="destructive">
                        {form.processing ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
