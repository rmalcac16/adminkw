import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLang } from '@/hooks/useLang';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { __ } = useLang();

    const { data, setData, post, processing, errors } = useForm<{ email: string }>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthLayout title={__('auth.forgot_title')} description={__('auth.forgot_description')}>
            <Head title={__('auth.forgot_head')} />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">{__('auth.email')}</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={__('auth.email_placeholder')}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6">
                        <Button className="w-full" disabled={processing}>
                            {processing ? (
                                <>
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    <span>{__('auth.sending')}</span>
                                </>
                            ) : (
                                <span>{__('auth.send_reset_link')}</span>
                            )}
                        </Button>
                    </div>
                </form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>{__('auth.or_return')}</span>
                    <TextLink href={route('login')}>{__('auth.login')}</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
