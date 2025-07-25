import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import InputError from '@/components/input-error';
import TextareaWithLineNumbers from '@/components/textarea-with-line-numbers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { languages } from '@/data/langs';
import { AnimeData } from '@/types/anime';
import { ServerData } from '@/types/server';

import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

const LinkValidationSummary = ({
    linkCount,
    validCount,
    invalidCount,
    invalidLines,
}: {
    linkCount: number;
    validCount: number;
    invalidCount: number;
    invalidLines: number[];
}) => (
    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Total:</span>
            <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">{linkCount}</Badge>
        </div>
        <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-muted-foreground">Válidos:</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                {validCount}
            </Badge>
        </div>
        <div className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="text-muted-foreground">Inválidos:</span>
            <Badge variant="destructive">{invalidCount}</Badge>
        </div>
        {invalidLines.length > 0 && (
            <div className="flex items-center gap-1 text-red-600">
                <AlertTriangle className="h-4 w-4" />
                <span>Líneas inválidas: {invalidLines.join(', ')}</span>
            </div>
        )}
    </div>
);

export function DialogGenerateEpisodesPlayers({
    anime,
    servers = [],
    open,
    setOpen,
}: {
    anime: AnimeData;
    servers?: ServerData[];
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const form = useForm({
        links: '',
        server_id: String(servers[0]?.id ?? ''),
        episode_initial: '0',
        language: '0',
    });

    const [linkCount, setLinkCount] = useState(0);
    const [invalidLinks, setInvalidLinks] = useState<string[]>([]);
    const [invalidLines, setInvalidLines] = useState<number[]>([]);
    const [validLinks, setValidLinks] = useState<string[]>([]);
    const [episodeFinal, setEpisodeFinal] = useState('0');

    const hasUserSelectedServer = useRef(false);

    useEffect(() => {
        const initial = Number(form.data.episode_initial);
        const calculatedEpisodeFinal = validLinks.length > 0 ? String(initial + validLinks.length - 1) : String(initial);

        setEpisodeFinal(calculatedEpisodeFinal);
    }, [form.data.episode_initial, validLinks.length]);

    const parseLinks = (text: string, currentServerId: string) => {
        const lines = text
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);

        if (!hasUserSelectedServer.current && lines.length > 0) {
            const domainCounts: Record<string, number> = {};
            lines.forEach((line) => {
                try {
                    const domain = new URL(line).hostname;
                    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
                } catch {}
            });

            const sortedDomains = Object.entries(domainCounts).sort((a, b) => b[1] - a[1]);
            const mostCommonDomain = sortedDomains[0]?.[0];

            const autoDetectedServer = servers.find((server) => server.domains?.some((d) => mostCommonDomain?.includes(d)));

            if (autoDetectedServer && String(autoDetectedServer.id) !== currentServerId) {
                form.setData('server_id', String(autoDetectedServer.id));
            }
        }

        const serverToValidateAgainst = servers.find((s) => String(s.id) === form.data.server_id);
        const valids: string[] = [];
        const invalids: string[] = [];
        const invalidLineNumbers: number[] = [];

        lines.forEach((link, index) => {
            try {
                const domain = new URL(link).hostname;
                const isValid = serverToValidateAgainst?.domains?.some((d) => domain.includes(d));
                if (isValid) {
                    valids.push(link);
                } else {
                    invalids.push(link);
                    invalidLineNumbers.push(index + 1);
                }
            } catch {
                invalids.push(link);
                invalidLineNumbers.push(index + 1);
            }
        });

        setValidLinks(valids);
        setInvalidLinks(invalids);
        setInvalidLines(invalidLineNumbers);
        setLinkCount(lines.length);

        if (lines.length === 0) {
            form.setData('episode_initial', '0');
        }
    };

    useEffect(() => {
        if (open) {
            parseLinks(form.data.links, form.data.server_id);
        } else {
            hasUserSelectedServer.current = false;
        }
    }, [open, form.data.server_id, form.data.links]);

    if (!servers.length) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md text-center">
                    <DialogHeader>
                        <DialogTitle>Generar Reproductores para {anime.name}</DialogTitle>
                        <DialogDescription className="flex items-center justify-center gap-2 text-orange-500">
                            <AlertTriangle className="h-5 w-5" /> ¡No hay servidores disponibles!
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 flex-col gap-2 sm:flex-row sm:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cerrar
                            </Button>
                        </DialogClose>
                        <Button asChild>
                            <Link href={route().has('servers.index') ? route('servers.index') : '#'}>Gestionar Servidores</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    const handleLinksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        form.setData('links', value);
        parseLinks(value, form.data.server_id);
    };

    const handleServerChange = (serverId: string) => {
        form.setData('server_id', serverId);
        hasUserSelectedServer.current = true;
    };

    const handleEpisodeInitialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const initial = Number(e.target.value);
        form.setData('episode_initial', String(initial));
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const expectedLinks = Number(episodeFinal) - Number(form.data.episode_initial) + 1;

        if (validLinks.length !== expectedLinks) {
            toast.error(`La cantidad de enlaces válidos (${validLinks.length}) no coincide con el número esperado de episodios (${expectedLinks}).`);
            return;
        }

        if (invalidLinks.length > 0) {
            toast.error('Hay enlaces inválidos. Por favor, corríjalos antes de generar.');
            return;
        }

        if (validLinks.length === 0) {
            toast.info('No hay enlaces para procesar.');
            return;
        }

        form.post(route('episodes.generate-players', anime.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                form.reset();
                setLinkCount(0);
                setInvalidLinks([]);
                setValidLinks([]);
                setInvalidLines([]);
                setEpisodeFinal('0');
                hasUserSelectedServer.current = false;
                toast.success('¡Reproductores generados exitosamente!');
            },
            onError: (errors) => {
                console.error('Error al generar reproductores:', errors);
                toast.error('Hubo un error al generar los reproductores.');
            },
        });
    };

    const isValidEpisodeRange = validLinks.length > 0 && validLinks.length === Number(episodeFinal) - Number(form.data.episode_initial) + 1;
    const isSubmitDisabled = form.processing || invalidLinks.length > 0 || !isValidEpisodeRange || validLinks.length === 0;

    const isEpisodeInitialDisabled = linkCount === 0;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-5xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Generar Reproductores para {anime.name}</DialogTitle>
                        <DialogDescription>Introduce los enlaces de los reproductores para generar episodios de {anime.name}.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="grid gap-2">
                                <Label htmlFor="server_id">Servidor</Label>
                                <Select value={form.data.server_id} onValueChange={handleServerChange} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un servidor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {servers.map((server) => (
                                            <SelectItem key={server.id} value={String(server.id)}>
                                                {server.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.server_id} className="mt-1" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="language">Idioma</Label>
                                <Select value={form.data.language} onValueChange={(value) => form.setData('language', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un idioma" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map((lang) => (
                                            <SelectItem key={lang.value} value={lang.value}>
                                                {lang.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.language} className="mt-1" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="episode_initial">Episodio Inicial</Label>
                                <Input
                                    id="episode_initial"
                                    type="number"
                                    min={0}
                                    value={form.data.episode_initial}
                                    onChange={handleEpisodeInitialChange}
                                    placeholder="Ej. 0"
                                    disabled={isEpisodeInitialDisabled}
                                    className={isEpisodeInitialDisabled ? 'cursor-not-allowed bg-muted' : ''}
                                />
                                <InputError message={form.errors.episode_initial} className="mt-1" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="episode_final">Episodio Final</Label>
                                <Input id="episode_final" type="number" readOnly value={episodeFinal} className="cursor-not-allowed bg-muted" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="links">Enlaces (uno por línea)</Label>
                            <TextareaWithLineNumbers
                                value={form.data.links}
                                onChange={handleLinksChange}
                                placeholder="Pega un enlace por línea, ejemplo:&#10;https://servidor.com/enlace1&#10;https://servidor.com/enlace2"
                                invalidLines={invalidLines}
                            />

                            <LinkValidationSummary
                                linkCount={linkCount}
                                validCount={validLinks.length}
                                invalidCount={invalidLinks.length}
                                invalidLines={invalidLines}
                            />

                            {!isValidEpisodeRange && validLinks.length > 0 && (
                                <div className="mt-1 flex items-center gap-1 text-sm text-orange-600">
                                    <Info className="h-4 w-4" />
                                    <span>
                                        La cantidad de enlaces válidos ({validLinks.length}) no coincide con el número esperado de episodios (
                                        {Number(episodeFinal) - Number(form.data.episode_initial) + 1}).
                                    </span>
                                </div>
                            )}
                            <InputError className="text-xs" message={form.errors.links} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitDisabled}>
                            {form.processing ? 'Procesando...' : 'Generar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
