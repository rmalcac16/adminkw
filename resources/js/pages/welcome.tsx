'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { LogIn, UserPlus } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { __ } = useLang();

    return (
        <>
            <Head title={__('welcome.title')}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
                <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="flex flex-col justify-center space-y-6">
                        <Badge variant="secondary" className="w-fit text-sm">
                            {__('welcome.badge')}
                        </Badge>

                        <h1 className="text-4xl font-extrabold sm:text-5xl">{__('welcome.heading')}</h1>

                        <p className="max-w-md text-lg text-muted-foreground">{__('welcome.description')}</p>

                        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                            {auth.user ? (
                                <Button size="lg" asChild>
                                    <Link href={route('dashboard.index')}>{__('welcome.dashboard')}</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button size="lg" asChild>
                                        <Link href={route('login')}>
                                            <LogIn />
                                            {__('welcome.login')}
                                        </Link>
                                    </Button>
                                    {route().has('register') && (
                                        <Button variant="outline" size="lg" asChild>
                                            <Link href={route('register')}>
                                                <UserPlus />
                                                {__('welcome.register')}
                                            </Link>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>

                        <p className="pt-4 text-sm text-muted-foreground">
                            {__('welcome.developed_by')} <strong>Dark</strong> —
                            <a href="https://github.com/rmalcac16" target="_blank" className="ml-1 underline underline-offset-4 hover:text-primary">
                                GitHub
                            </a>
                        </p>
                    </div>

                    {/* Imagen decorativa */}
                    <div className="hidden items-center justify-center md:flex">
                        <img src="/images/welcome-anime.svg" alt="Anime Kawaii" className="w-full max-w-sm" />
                    </div>
                </div>
            </main>
        </>
    );
}
