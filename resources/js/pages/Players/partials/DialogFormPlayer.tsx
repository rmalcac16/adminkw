import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages } from '@/data/langs';
import { PlayerData } from '@/types/player';
import { ServerData } from '@/types/server';
import { useForm } from '@inertiajs/react';
import { IconCircleCheck } from '@tabler/icons-react';
import { FormEventHandler, useEffect, useState } from 'react';

export function DialogFormPlayer({
    animeId,
    episodeId,
    player,
    open,
    setOpen,
    servers,
}: {
    animeId: number;
    episodeId: number;
    player?: PlayerData | null;
    open: boolean;
    setOpen: (open: boolean) => void;
    servers: ServerData[];
}) {
    const isEdit = !!player;

    const [isValidDomain, setIsValidDomain] = useState(false);

    const form = useForm({
        code: player?.code_backup || '',
        languaje: player?.languaje ?? 0,
        server_id: player?.server_id ?? (servers[0]?.id || ''),
        episode_id: episodeId,
        _method: isEdit ? 'put' : 'post',
    });

    useEffect(() => {
        const selectedServer = servers.find((s) => s.id === Number(form.data.server_id));
        const isValid = selectedServer?.domains?.some((domain) => form.data.code.includes(domain)) ?? false;
        setIsValidDomain(isValid);
    }, [form.data.code, form.data.server_id]);

    useEffect(() => {
        const matchedServer = servers.find((server) =>
            [...(server.domains || [])].sort((a, b) => b.length - a.length).some((domain) => form.data.code.includes(domain)),
        );

        const isValid = !!matchedServer;
        setIsValidDomain(isValid);

        if (isValid && matchedServer?.id !== form.data.server_id) {
            form.setData('server_id', matchedServer.id);
        }
    }, [form.data.code]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        form.post(
            isEdit
                ? route('players.update', { anime: animeId, episode: episodeId, player: player?.id })
                : route('players.store', { anime: animeId, episode: episodeId }),
            {
                onSuccess: () => {
                    setOpen(false);
                },
            },
        );
    };

    const isUnchanged = isEdit && player && form.data.code === player.code_backup;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Editar reproductor' : 'Crear reproductor'}</DialogTitle>
                    <DialogDescription>{isEdit ? 'Edita los detalles del reproductor.' : 'Crea un nuevo reproductor.'}</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="server_id">Servidor</Label>
                            <Select value={String(form.data.server_id)} onValueChange={(value) => form.setData('server_id', parseInt(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder={'Selecciona un servidor'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {servers.map((server) => (
                                        <SelectItem key={server.id} value={String(server.id)}>
                                            {server.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.server_id} className="text-xs" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="languaje">Idioma</Label>
                            <Select value={String(form.data.languaje)} onValueChange={(value) => form.setData('languaje', parseInt(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder={'Selecciona un idioma'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.value} value={String(lang.value)}>
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.languaje} className="text-xs" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="server_id">Dominios</Label>
                        {(() => {
                            const selectedServer = servers.find((s) => s.id === Number(form.data.server_id));
                            const matchedDomain = [...(selectedServer?.domains || [])]
                                .sort((a, b) => b.length - a.length)
                                .find((domain) => form.data.code.includes(domain));
                            return selectedServer?.domains?.length ? (
                                <div className="flex flex-wrap items-center gap-2">
                                    {selectedServer.domains.map((domain) => (
                                        <Badge variant={domain === matchedDomain ? 'secondary' : 'secondary'} key={domain}>
                                            {domain}
                                            {domain === matchedDomain && <IconCircleCheck className="text-green-500" />}
                                        </Badge>
                                    ))}
                                </div>
                            ) : null;
                        })()}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="code">Enlace</Label>
                        <Input
                            value={form.data.code}
                            onChange={(e) => form.setData('code', e.target.value)}
                            placeholder={'Ingresa un enlace'}
                            required
                            autoFocus
                        />
                        <InputError message={form.errors.code} className="text-xs" />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={form.processing || !isValidDomain || isUnchanged}>
                            {form.processing ? (isEdit ? 'Actualizando...' : 'Creando...') : isEdit ? 'Actualizar' : 'Crear'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
