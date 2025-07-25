import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useLang } from '@/hooks/useLang';
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
    const { __ } = useLang();
    const isEdit = !!episode;

    const form = useForm<{ number: number | string }>({
        number: isEdit ? (episode?.number ?? 1) : episodeNumberDefault,
    });

    useEffect(() => {
        form.setData('number', isEdit && episode ? episode.number : episodeNumberDefault);
    }, [anime.id, episode?.id, episodeNumberDefault]);

    const isUnchanged = isEdit && episode && form.data.number === episode.number;

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const url = isEdit ? route('episodes.update', { anime: anime.id, episode: episode.id }) : route('episodes.store', { anime: anime.id });

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        };

        isEdit ? form.put(url, options) : form.post(url, options);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? __('episodes.actions.edit') : __('episodes.actions.create')}</DialogTitle>
                        <DialogDescription>
                            {isEdit
                                ? __('episodes.actions.edit_description', { number: episode?.number })
                                : __('episodes.actions.create_description')}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="number">{__('episodes.labels.number')}</Label>
                            <Input
                                id="number"
                                type="number"
                                min={0}
                                value={form.data.number}
                                onChange={(e) => form.setData('number', e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder={__('episodes.placeholders.number')}
                                required
                            />
                            <InputError className="text-xs" message={form.errors.number} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                {__('common.actions.cancel')}
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={form.processing || isUnchanged}>
                            {form.processing
                                ? isEdit
                                    ? __('common.loaders.updating')
                                    : __('common.loaders.creating')
                                : isEdit
                                  ? __('common.actions.update')
                                  : __('common.actions.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
