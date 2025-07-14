'use client';

import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { EpisodeData } from '@/types/episode';

interface Props {
    episode: EpisodeData;
}

export default function DialogDeleteEpisode({ episode }: Props) {
    const { __ } = useLang();
    const [open, setOpen] = useState(false);
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
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="size-8" disabled={form.processing}>
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{__('episodes.actions.delete')}</AlertDialogTitle>
                    <AlertDialogDescription>{__('episodes.actions.delete_description', { number: episode.number })}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={form.processing}>{__('common.actions.cancel')}</AlertDialogCancel>
                    <Button onClick={handleDelete} disabled={form.processing} variant="destructive">
                        {form.processing ? __('common.loaders.deleting') : __('common.actions.confirm')}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
