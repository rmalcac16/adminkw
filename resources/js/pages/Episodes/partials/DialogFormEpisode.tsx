import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AnimeData } from '@/types/anime';
import { EpisodeData } from '@/types/episode';

interface Props {
    anime: AnimeData;
    episode?: EpisodeData;
    episodeNumberDefault?: number;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function DialogFormEpisode({ anime, episode, episodeNumberDefault = 1, open, setOpen }: Props) {
    const isEdit = !!episode;

    const form = useForm<{ number: number | string }>({
        number: isEdit ? (episode?.number ?? 1) : episodeNumberDefault,
    });

    useEffect(() => {
        if (open) {
            form.reset();
            form.setData('number', isEdit && episode ? episode.number : episodeNumberDefault);
            form.setError('number', '');
        }
    }, [open, episode]);

    const isUnchanged = isEdit && episode && form.data.number === episode.number;

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (isEdit) {
            form.put(route('episodes.update', { anime: anime.id, episode: episode.id }), {
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
                preserveScroll: true,
            });
        } else {
            form.post(route('episodes.store', { anime: anime.id }), {
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Editar episodio' : 'Crear episodio'}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? `Edita el episodio #${episode?.number}.` : 'Completa el formulario para crear un nuevo episodio.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="number">Número de episodio</Label>
                            <Input
                                id="number"
                                type="number"
                                min={0}
                                value={form.data.number}
                                onChange={(e) => form.setData('number', e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="Ingresa el número del episodio"
                                required
                                disabled={form.processing}
                            />
                            <InputError className="text-xs" message={form.errors.number} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={form.processing || isUnchanged}>
                            {form.processing ? (isEdit ? 'Actualizando...' : 'Creando...') : isEdit ? 'Actualizar' : 'Crear'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
