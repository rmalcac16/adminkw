'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLang } from '@/hooks/useLang';
import { PlayerData } from '@/types/player';
import { ServerData } from '@/types/server';
import { useForm } from '@inertiajs/react';
import { Edit2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function PlayerDialogForm({
    servers,
    player,
    animeId,
    episodeId,
    triggerType = 'button',
}: {
    servers: ServerData[];
    player?: PlayerData;
    animeId: number;
    episodeId: number;
    triggerType?: 'button' | 'icon';
}) {
    const isEditing = !!player;
    const { __ } = useLang();

    const [open, setOpen] = useState(false);
    const [isValidDomain, setIsValidDomain] = useState(true);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        code: player?.code || '',
        languaje: player?.languaje ?? 0,
        server_id: player?.server_id ?? (servers[0]?.id || ''),
        episode_id: episodeId,
    });

    const validateCodeDomain = (code: string, serverId: number) => {
        try {
            const url = new URL(code);
            const currentServer = servers.find((s) => s.id === serverId);
            const allowedDomains = currentServer?.domains || [];

            const isMatch = allowedDomains.some((domain) => url.hostname.includes(domain));
            setIsValidDomain(isMatch);

            if (!isMatch) {
                toast.warning(__('players.validation.invalid_domain') || 'El dominio no pertenece al servidor seleccionado');
            }
        } catch {
            setIsValidDomain(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidDomain) {
            toast.error(__('players.validation.blocked_submission') || 'Dominio inválido, no puedes guardar.');
            return;
        }

        const onSuccess = () => {
            reset();
            setOpen(false);
        };

        if (isEditing) {
            put(
                route('players.update', {
                    anime: animeId,
                    episode: episodeId,
                    player: player.id,
                }),
                {
                    preserveScroll: true,
                    onSuccess,
                },
            );
        } else {
            post(route('players.store', { anime: animeId, episode: episodeId }), {
                preserveScroll: true,
                onSuccess,
            });
        }
    };

    const handleCodeChange = (value: string) => {
        setData('code', value);
        validateCodeDomain(value, Number(data.server_id));
    };

    const handleServerChange = (value: string) => {
        const serverId = parseInt(value);
        setData('server_id', serverId);
        validateCodeDomain(data.code, serverId);
    };

    useEffect(() => {
        if (errors.languaje && errors.languaje.toLowerCase().includes('ya existe un reproductor')) {
            toast.warning(errors.languaje);
        }
    }, [errors.languaje]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEditing ? (
                    <Button variant="outline" size="icon" className="size-8" disabled={processing}>
                        <Edit2 />
                    </Button>
                ) : (
                    <Button>
                        <Plus />
                        {__('players.create.button')}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? __('players.edit.title') : __('players.create.title')}</DialogTitle>
                    <DialogDescription>{isEditing ? __('players.edit.description') : __('players.create.description')}</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="server_id">{__('players.form.server')}</Label>
                            <Select value={String(data.server_id)} onValueChange={handleServerChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder={__('players.form.server_placeholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {servers.map((server) => (
                                        <SelectItem key={server.id} value={String(server.id)}>
                                            {server.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.server_id && <p className="text-sm text-red-500">{errors.server_id}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="languaje">{__('players.form.language')}</Label>
                            <Select value={String(data.languaje)} onValueChange={(value) => setData('languaje', parseInt(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder={__('players.form.language_placeholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">{__('players.languages.0')}</SelectItem>
                                    <SelectItem value="1">{__('players.languages.1')}</SelectItem>
                                    <SelectItem value="2">{__('players.languages.2')}</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.languaje && !errors.languaje.toLowerCase().includes('ya existe un reproductor') && (
                                <p className="text-sm text-red-500">{errors.languaje}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="code">{__('players.form.code')}</Label>
                        <Input
                            value={data.code}
                            onChange={(e) => handleCodeChange(e.target.value)}
                            placeholder={__('players.form.code_placeholder')}
                            required
                        />
                        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={processing || !isValidDomain}>
                            {processing
                                ? isEditing
                                    ? __('common.updating')
                                    : __('common.creating')
                                : isEditing
                                  ? __('common.update')
                                  : __('common.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
