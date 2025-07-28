import { useForm } from '@inertiajs/react';
import { PlusCircle, X } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { languages } from '@/data/langs';
import { ServerData } from '@/types/server';

interface PlayerData {
    server_id: number;
    code: string;
    languaje: number;
    episode_id: number;
    [key: string]: number | string;
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
    open: boolean;
    setOpen: (open: boolean) => void;
    servers: ServerData[];
}) {
    const [selectedLanguages, setSelectedLanguages] = useState<{ value: number; label: string }[]>([]);
    const form = useForm<{ players: PlayerData[] }>({
        players: [],
    });

    // Reset state when dialog opens
    useEffect(() => {
        if (open) {
            const subtituladoDefault = languages.find((lang) => Number(lang.value) === 0);
            if (subtituladoDefault && servers.length > 0) {
                const defaultLanguages = [{ value: Number(subtituladoDefault.value), label: subtituladoDefault.label }];
                const defaultPlayers = servers.map((server) => ({
                    server_id: server.id,
                    code: '',
                    languaje: Number(subtituladoDefault.value),
                    episode_id: episodeId,
                }));
                setSelectedLanguages(defaultLanguages);
                form.setData('players', defaultPlayers);
                form.clearErrors();
            } else {
                setSelectedLanguages([]);
                form.setData('players', []);
                form.clearErrors();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, episodeId, servers]);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
    };

    const ServerPlayerInput = ({ server, player }: { server: ServerData; player: PlayerData }) => {
        const playerIndex = form.data.players.findIndex((p) => p.server_id === player.server_id && p.languaje === player.languaje);
        const error = form.errors && (form.errors as any)[`players.${playerIndex}.code`];

        return (
            <div className="relative rounded-md border p-3 shadow-sm">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removeServerFromGroup(server.id, player.languaje)}
                    aria-label={`Quitar ${server.title}`}
                >
                    <X className="h-4 w-4" />
                </Button>
                <Label htmlFor={`server-${server.id}-${player.languaje}`} className="mb-2 block text-center text-sm font-medium">
                    {server.title}
                </Label>
                <Input
                    id={`server-${server.id}-${player.languaje}`}
                    value={player.code}
                    onChange={(e) => updatePlayerCode(server.id, player.languaje, e.target.value)}
                    placeholder={`Enlace para ${server.title}`}
                    className="h-9 text-sm"
                />
                {error && <InputError message={error} className="mt-1 text-xs" />}
            </div>
        );
    };

    const LanguagePlayerGroup = ({ language }: { language: { value: number; label: string } }) => {
        const playersInGroup = form.data.players.filter((p) => p.languaje === language.value);
        const displayedServerIds = playersInGroup.map((p) => p.server_id);
        const availableServersToAdd = servers.filter((s) => !displayedServerIds.includes(s.id));

        return (
            <div className="space-y-4 rounded-lg border bg-secondary/30 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{`Idioma: ${language.label}`}</h3>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button type="button" variant="outline" size="sm" disabled={availableServersToAdd.length === 0}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Añadir Servidor
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {availableServersToAdd.length > 0 ? (
                                    availableServersToAdd.map((server) => (
                                        <DropdownMenuItem key={server.id} onSelect={() => addServerToGroup(server, language.value)}>
                                            {server.title}
                                        </DropdownMenuItem>
                                    ))
                                ) : (
                                    <DropdownMenuItem disabled>Todos los servidores añadidos</DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLanguageGroup(language.value)}
                            aria-label="Eliminar grupo de idioma"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                {playersInGroup.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {playersInGroup.map((player) => {
                            const server = servers.find((s) => s.id === player.server_id);
                            return server ? <ServerPlayerInput key={server.id} server={server} player={player} /> : null;
                        })}
                    </div>
                ) : (
                    <div className="py-4 text-center text-sm text-muted-foreground">Añade servidores a este grupo.</div>
                )}
            </div>
        );
    };

    const addLanguageGroup = (language: { value: number; label: string }) => {
        setSelectedLanguages((prev) => [...prev, language]);
        // Add all servers for this language
        const newPlayers = servers.map((server) => ({
            server_id: server.id,
            code: '',
            languaje: language.value,
            episode_id: episodeId,
        }));
        form.setData('players', [...form.data.players, ...newPlayers]);
    };

    const removeLanguageGroup = (languageValue: number) => {
        setSelectedLanguages((prev) => prev.filter((lang) => lang.value !== languageValue));
        form.setData(
            'players',
            form.data.players.filter((p) => p.languaje !== languageValue),
        );
    };

    const addServerToGroup = (server: ServerData, languageValue: number) => {
        form.setData('players', [
            ...form.data.players,
            {
                server_id: server.id,
                code: '',
                languaje: languageValue,
                episode_id: episodeId,
            },
        ]);
    };

    const removeServerFromGroup = (serverId: number, languageValue: number) => {
        form.setData(
            'players',
            form.data.players.filter((p) => !(p.server_id === serverId && p.languaje === languageValue)),
        );
    };

    const updatePlayerCode = (serverId: number, languageValue: number, newCode: string) => {
        form.setData(
            'players',
            form.data.players.map((p) => (p.server_id === serverId && p.languaje === languageValue ? { ...p, code: newCode } : p)),
        );
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const validPlayers = form.data.players.filter((p) => p.code.trim() !== '');
        if (validPlayers.length === 0) return;

        form.setData('players', validPlayers);
        form.post(route('players.create-multiple', { anime: animeId, episode: episodeId }), {
            onSuccess: () => setOpen(false),
            preserveState: true,
        });
    };

    const availableLanguages = languages.filter((lang) => !selectedLanguages.some((selected) => selected.value === Number(lang.value)));

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-h-[90vh] w-full overflow-y-auto lg:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Crear Reproductores por Lotes</DialogTitle>
                    <DialogDescription>Añade o quita idiomas y servidores según necesites. Los campos vacíos se ignorarán.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-6">
                        {selectedLanguages.map((lang) => (
                            <LanguagePlayerGroup key={lang.value} language={lang} />
                        ))}
                    </div>

                    {availableLanguages.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button type="button" variant="outline" className="w-full">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Añadir Grupo de Idioma
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {availableLanguages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.value}
                                        onSelect={() => addLanguageGroup({ value: Number(lang.value), label: lang.label })}
                                    >
                                        {lang.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={form.processing || form.data.players.filter((p) => p.code.trim()).length === 0}>
                            {form.processing ? 'Guardando...' : 'Crear Reproductores'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
