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
import { PlayerData } from '@/types/player';
import { useForm } from '@inertiajs/react';
import { Trash2, TriangleAlert } from 'lucide-react';

export function PlayerDialogDelete({ animeId, episodeId, player }: { animeId: number; episodeId: number; player: PlayerData }) {
    const { __ } = useLang();
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route('players.destroy', { anime: animeId, episode: episodeId, player: player.id }), {
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
                    <AlertDialogTitle>{__('players.delete.title', { id: player.id })}</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col items-center space-y-6">
                        <TriangleAlert className="size-24 text-yellow-500" />
                        {__('players.delete.description', { server: player.server?.title ?? '—' })}
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
