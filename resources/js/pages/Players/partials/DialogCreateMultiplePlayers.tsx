import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { languages } from '@/data/langs';
import { PlayerData } from '@/types/player';
import { ServerData } from '@/types/server';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

function normalizeEmbedUrl(originalUrl: string, embedDomain: string): string {
    try {
        const url = new URL(originalUrl.trim());
        const segments = url.pathname.split('/').filter(Boolean);
        const index = segments.findIndex((seg) => ['e', 'd', 's'].includes(seg.toLowerCase()));
        if (index !== -1 && segments.length > index + 1) {
            const videoId = segments[index + 1];
            const cleanDomain = embedDomain.replace(/\/$/, '');
            return `${cleanDomain}/e/${videoId}`;
        }
        return originalUrl;
    } catch (error) {
        return originalUrl;
    }
}

export function DialogCreateMultiplePlayers({
    animeId,
    episodeId,
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
    const form = useForm({
        code: '',
        languaje: 0,
        episode_id: episodeId,
    });

    const [players, setPlayers] = useState<
        {
            link: string;
            original: string;
            languaje: number;
            server: ServerData;
            thumbnail?: string;
        }[]
    >([]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (players.length === 0) return;

        form.post(route('players.storeMultiple', { animeId, episodeId }), {
            onSuccess: () => {
                setOpen(false);
                form.reset();
                setPlayers([]);
            },
        });
    };

    const handleAddPlayers = () => {
        const inputLink = form.data.code.trim();
        if (!inputLink) return;

        // Detectar todos los servidores compatibles
        const compatibleServers = servers.filter((server) => (server.domains || []).some((domain) => inputLink.includes(domain)));

        if (compatibleServers.length === 0) return;

        const newEntries = compatibleServers.map((server) => {
            const embedLink = normalizeEmbedUrl(inputLink, server.embed ?? '');
            return {
                link: embedLink,
                original: inputLink,
                languaje: form.data.languaje,
                server,
                thumbnail: `https://image.thum.io/get/width/400/crop/600/noanimate/${encodeURIComponent(embedLink)}`,
            };
        });

        // Evitar duplicados por `link` + `server`
        setPlayers((prev) => {
            const existing = new Set(prev.map((p) => `${p.link}-${p.server.id}`));
            const filtered = newEntries.filter((entry) => !existing.has(`${entry.link}-${entry.server.id}`));
            return [...prev, ...filtered];
        });

        form.setData('code', '');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-5xl">
                <DialogHeader>
                    <DialogTitle>Crear múltiples reproductores</DialogTitle>
                    <DialogDescription>Agrega varios enlaces con su idioma correspondiente para todos los servidores compatibles.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Enlace</Label>
                            <Input value={form.data.code} onChange={(e) => form.setData('code', e.target.value)} placeholder="Ingresa un enlace" />
                            <InputError message={form.errors.code} className="text-xs" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="languaje">Idioma</Label>
                            <Select value={String(form.data.languaje)} onValueChange={(value) => form.setData('languaje', parseInt(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un idioma" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.value} value={String(lang.value)}>
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Button type="button" onClick={handleAddPlayers}>
                                Agregar
                            </Button>
                        </div>
                    </div>

                    {players.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                            {players.map((player, index) => (
                                <Card key={index} className="flex w-64 flex-col justify-between p-2">
                                    <div className="aspect-video w-full overflow-hidden rounded border bg-black">
                                        <iframe src={player.link} className="h-full w-full" frameBorder="0" allowFullScreen />
                                    </div>

                                    <CardContent className="mt-2 p-2 text-xs break-all text-muted-foreground">
                                        <div className="font-semibold text-black">{player.server?.title}</div>
                                        <div className="text-sm capitalize">
                                            Idioma: {languages.find((l) => Number(l.value) === Number(player.languaje))?.label}
                                        </div>
                                        <div className="text-xs text-blue-600">
                                            Embed: {player.link.length > 42 ? `${player.link.slice(0, 42)}...` : player.link}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Original: {player.original.length > 42 ? `${player.original.slice(0, 42)}...` : player.original}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex justify-between gap-2 p-2">
                                        <Button type="button" variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(player.link)}>
                                            Copiar
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setPlayers((prev) => prev.filter((_, i) => i !== index))}
                                        >
                                            Eliminar
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={form.processing || players.length === 0}>
                            {form.processing ? 'Guardando...' : 'Crear Reproductores'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
