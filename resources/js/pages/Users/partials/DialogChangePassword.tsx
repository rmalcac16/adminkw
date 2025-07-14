import { useForm } from '@inertiajs/react';
import { Check, Eye, EyeOff } from 'lucide-react';
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

export default function DialogChangePassword({ open, setOpen, user }: Props) {
    const { __ } = useLang();

    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        password: '',
    });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    useEffect(() => {
        if (!open) {
            form.reset();
        }
    }, [open]);

    const handleSubmit = () => {
        if (!user) return;

        form.put(route('users.update-password', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    const isValidLength = form.data.password.length >= 8;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{__('users.actions.change_password')}</DialogTitle>
                    <DialogDescription>{__('users.actions.change_password_description')}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-2">
                    <Label htmlFor="dialog_password">{__('users.labels.password')}</Label>
                    <div className="relative">
                        <Input
                            key={`dialog_password_${user?.id}`}
                            id="dialog_password"
                            name="dialog_password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            spellCheck="false"
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            placeholder={__('users.placeholders.password')}
                            className={isValidLength ? 'pr-10' : ''}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        {isValidLength && <Check className="absolute top-1/2 right-10 h-4 w-4 -translate-y-1/2 text-green-600" />}
                    </div>
                    <InputError message={form.errors.password} className="text-xs" />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">{__('common.actions.cancel')}</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={form.processing || !isValidLength}>
                        {form.processing ? __('common.actions.saving') : __('common.actions.save_changes')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
