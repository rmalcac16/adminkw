'use client';

import InputError from '@/components/input-error';
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
import { Label } from '@/components/ui/label';
import { useLang } from '@/hooks/useLang';
import { AnimeData } from '@/types/anime';
import { EpisodeData } from '@/types/episode';
import { useForm } from '@inertiajs/react';
import { Pencil, PlusIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { route } from 'ziggy-js';

export function EpisodeDialogForm({
    anime,
    episode,
    triggerType = 'button',
}: {
    anime: AnimeData;
    episode?: EpisodeData;
    triggerType?: 'icon' | 'button';
}) {
    const { __ } = useLang();
    const isEdit = !!episode;
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        number: episode?.number ?? 1,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const url = isEdit ? route('episodes.update', { anime: anime, episode: episode!.id }) : route('episodes.store', { anime: anime });

        const options = {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setOpen(false);
                reset();
            },
            onError: (errors: Record<string, string>) => {
                console.log('Errores:', errors);
            },
        };

        isEdit ? post(url, options) : post(url, options);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerType === 'button' ? (
                    <Button className="cursor-pointer" disabled={processing}>
                        <PlusIcon />
                        {__('episodes.create.button')}
                    </Button>
                ) : (
                    <Button variant="secondary" size="icon" className="size-8 cursor-pointer" disabled={processing}>
                        <Pencil />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[400px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? __('episodes.edit.title') : __('episodes.create.title')}</DialogTitle>
                        <DialogDescription>{isEdit ? __('episodes.edit.description') : __('episodes.create.description')}</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="number">{__('episodes.form.number')}</Label>
                            <Input
                                id="number"
                                type="number"
                                value={data.number}
                                min={1}
                                onChange={(e) => setData('number', Number(e.target.value))}
                                required
                            />
                            <InputError className="text-xs" message={errors.number} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                {__('common.cancel')}
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {isEdit ? __('common.update') : __('common.save')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
