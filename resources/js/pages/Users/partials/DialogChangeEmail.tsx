import { useForm } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useLang } from '@/hooks/useLang';
import { UserData } from '@/types/user';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    user?: UserData | null;
}

export default function DialogChangeEmail({ open, setOpen, user }: Props) {
    const { __ } = useLang();
    const [originalEmail, setOriginalEmail] = useState('');

    const form = useForm({
        email: '',
    });

    useEffect(() => {
        if (user) {
            form.setData('email', user.email);
            setOriginalEmail(user.email);
        } else {
            form.reset();
            setOriginalEmail('');
        }
    }, [user]);

    const isValidEmail = form.data.email.length > 0 && form.data.email !== originalEmail;

    const handleSubmit = () => {
        if (!user || !isValidEmail) return;

        form.put(route('users.update-email', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{__('users.actions.change_email')}</DialogTitle>
                    <DialogDescription>{__('users.actions.change_email_description')}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-2">
                    <Label htmlFor="email">{__('users.labels.email')}</Label>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            placeholder={__('users.placeholders.email')}
                            autoComplete="off"
                            className={isValidEmail ? 'pr-8' : ''}
                        />
                        {isValidEmail && <Check className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-green-600" />}
                    </div>
                    <InputError message={form.errors.email} className="text-xs" />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">{__('common.actions.cancel')}</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={form.processing || !isValidEmail}>
                        {form.processing ? __('common.actions.saving') : __('common.actions.save_changes')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
