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
import { AnimeData } from '@/types/anime';
import { useForm } from '@inertiajs/react';
import { Trash2, TriangleAlert } from 'lucide-react';

export function AnimeDialogDelete({ anime }: { anime: AnimeData }) {
    const { __ } = useLang();

    const form = useForm({});

    const handleDelete = () => {
        form.delete(route('animes.destroy', anime.id), {
            preserveScroll: true,
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="size-8" disabled={form.processing}>
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{__('animes.actions.delete')}</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col items-center space-y-6">
                        <TriangleAlert size={96} className="text-yellow-500" />
                        {__('animes.actions.delete_description', {
                            name: anime.name,
                        })}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={form.processing}>{__('common.cancel')}</AlertDialogCancel>
                    <Button type="button" onClick={handleDelete} disabled={form.processing} variant="destructive">
                        {form.processing ? __('common.deleting') : __('common.delete')}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
