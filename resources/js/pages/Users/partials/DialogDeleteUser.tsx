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
import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    user: { id: number; name: string };
}

export default function DeleteUserDialog({ user }: Props) {
    const { __ } = useLang();
    const [open, setOpen] = useState(false);

    const form = useForm({});

    const handleDelete = () => {
        form.delete(route('users.destroy', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
            },
        });
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
                    <AlertDialogTitle>{__('users.actions.delete')}</AlertDialogTitle>
                    <AlertDialogDescription>{__('users.actions.delete_description', { name: user.name })}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={form.processing}>{__('common.actions.cancel')}</AlertDialogCancel>
                    <Button onClick={handleDelete} disabled={form.processing}>
                        {form.processing ? __('common.actions.deleting') : __('common.actions.confirm')}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
