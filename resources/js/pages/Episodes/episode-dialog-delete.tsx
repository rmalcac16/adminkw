'use client';

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
import { useForm } from '@inertiajs/react';
import { Trash2, TriangleAlert } from 'lucide-react';

export function EpisodeDialogDelete({ episode }: { episode: EpisodeData }) {
    const { __ } = useLang();
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route('episodes.destroy', { anime: episode.anime_id, episode: episode.id }), {
            preserveScroll: true,
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="size-8" disabled={processing}>
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{__('episodes.delete.title', { number: episode.number })}</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col items-center space-y-6">
                        <TriangleAlert className="size-24 text-yellow-500" />
                        {__('episodes.delete.description', { number: episode.number })}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>{__('common.cancel')}</AlertDialogCancel>
                    <Button type="button" onClick={handleDelete} disabled={processing} variant="destructive">
                        {processing ? __('common.deleting') : __('common.delete')}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
