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
import { toast } from 'sonner';

export function AnimeDialogDelete({ anime }: { anime: AnimeData }) {
    const { __ } = useLang();
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route('animes.destroy', anime.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast(__('animes.delete.success', { name: anime.name || __('common.unknown') }), {
                    icon: <Trash2 className="text-red-400" />,
                });
            },
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
                    <AlertDialogTitle>{__('animes.delete.title', { name: anime.name || __('common.unknown') })}</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col items-center space-y-6">
                        <TriangleAlert className="size-24 text-yellow-500" />
                        {__('animes.delete.description', { name: anime.name || __('common.unknown') })}
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
