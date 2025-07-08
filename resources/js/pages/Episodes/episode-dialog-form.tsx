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
import { Label } from '@/components/ui/label';
import { useLang } from '@/hooks/useLang';
import { EpisodeData } from '@/types/episode';
import { useForm } from '@inertiajs/react';
import { Pencil, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export function EpisodeDialogForm({
    animeId,
    episode,
    triggerType = 'button',
}: {
    animeId: number;
    episode?: EpisodeData;
    triggerType?: 'icon' | 'button';
}) {
    const { __ } = useLang();
    const isEdit = !!episode;
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        number: episode?.number ?? '',
        _method: isEdit ? 'put' : 'post',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const onSuccess = () => {
            reset();
            setOpen(false);
        };

        const url = isEdit ? route('episodes.update', { anime: animeId, episode: episode!.id }) : route('episodes.store', animeId);

        isEdit ? put(url, { onSuccess }) : post(url, { onSuccess });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerType === 'button' ? (
                    <Button>
                        <PlusIcon />
                        {__('episodes.create.button')}
                    </Button>
                ) : (
                    <Button variant="secondary" size="icon" className="size-8">
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
                                onChange={(e) => setData('number', parseInt(e.target.value))}
                                required
                            />
                            {errors.number && <p className="text-xs text-red-400">{errors.number}</p>}
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
