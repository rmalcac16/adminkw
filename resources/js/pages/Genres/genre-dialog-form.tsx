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
import { GenreData } from '@/types/genre';
import { useForm } from '@inertiajs/react';
import { Pencil, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function GenreDialogForm({ genre, triggerType = 'button' }: { genre?: GenreData; triggerType?: 'icon' | 'button' }) {
    const { __ } = useLang();
    const isEdit = !!genre;

    const [open, setOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: genre?.title ?? '',
        name_mal: genre?.name_mal ?? '',
        _method: isEdit ? 'put' : 'post',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const onSuccess = () => {
            reset();
            setOpen(false);
            toast(isEdit ? __('genres.update_success') : __('genres.create_success'));
        };

        if (isEdit) {
            post(route('genres.update', genre!.id), { onSuccess });
        } else {
            post(route('genres.store'), { onSuccess });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerType === 'button' ? (
                    <Button>
                        <PlusIcon />
                        {__('genres.create.button')}
                    </Button>
                ) : (
                    <Button variant="secondary" size="icon" className="size-8">
                        <Pencil />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? __('genres.edit.title') : __('genres.create.title')}</DialogTitle>
                        <DialogDescription>{isEdit ? __('genres.edit.description') : __('genres.create.description')}</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">{__('genres.form.name')}</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder={__('genres.form.title_placeholder')}
                                required
                                autoFocus
                            />
                            {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name_mal">{__('genres.form.name_mal')}</Label>
                            <Input
                                id="name_mal"
                                value={data.name_mal}
                                onChange={(e) => setData('name_mal', e.target.value)}
                                placeholder={__('genres.form.name_mal_placeholder')}
                            />
                            {errors.name_mal && <p className="text-xs text-red-400">{errors.name_mal}</p>}
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
