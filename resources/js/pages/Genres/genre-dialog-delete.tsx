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
import { GenreData } from '@/types/genre';
import { useForm } from '@inertiajs/react';
import { Trash2, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

export function GenreDialogDelete({ genre }: { genre: GenreData }) {
    const { __ } = useLang();
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route('genres.destroy', genre.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast(__('genres.delete.success', { name: genre.title || __('common.unknown') }), {
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
                    <AlertDialogTitle>{__('genres.delete.title', { name: genre.title || __('common.unknown') })}</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col items-center space-y-6">
                        <TriangleAlert className="size-24 text-yellow-500" />
                        {__('genres.delete.description', { name: genre.title || __('common.unknown') })}
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
