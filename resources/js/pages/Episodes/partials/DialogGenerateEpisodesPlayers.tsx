import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextareaWithLineNumbers from '@/components/textarea-with-line-numbers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { useLang } from '@/hooks/useLang';
import { AnimeData } from '@/types/anime';
import { ServerData } from '@/types/server';
import { AlertTriangle, CheckCircle, TriangleAlert } from 'lucide-react';

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
    const { __ } = useLang();

    const form = useForm({
        links: '',
        server_id: String(servers[0]?.id ?? ''),
        episode_initial: 1,
        language: '0',
    });

    const [linkCount, setLinkCount] = useState(0);
    const [invalidLinks, setInvalidLinks] = useState<string[]>([]);
    const [invalidLines, setInvalidLines] = useState<number[]>([]);
    const [validLinks, setValidLinks] = useState<string[]>([]);
    const [episodeFinal, setEpisodeFinal] = useState(form.data.episode_initial);

    if (!servers.length) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md text-center">
                    <DialogHeader>
                        <DialogTitle>{__('episodes.actions.generate', { anime: anime.name })}</DialogTitle>
                        <DialogDescription>⚠️ {__('episodes.messages.no_servers_available')}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                {__('common.actions.close')}
                            </Button>
                        </DialogClose>
                        <Button asChild>
                            <Link href={route().has('servers.index') ? route('servers.index') : '#'}>{__('common.actions.manage_servers')}</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    const parseLinks = (text: string, overrideServerId?: string) => {
        const lines = text
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);

        const domainCounts: Record<string, number> = {};
        lines.forEach((line) => {
            try {
                const domain = new URL(line).hostname;
                domainCounts[domain] = (domainCounts[domain] || 0) + 1;
            } catch {}
        });

        const sortedDomains = Object.entries(domainCounts).sort((a, b) => b[1] - a[1]);
        const mostCommonDomain = sortedDomains[0]?.[0];
        const autoServer = servers.find((server) => server.domains?.some((d) => mostCommonDomain?.includes(d)));
        const serverIdToUse = overrideServerId ?? String(autoServer?.id ?? form.data.server_id);

        if (!overrideServerId && autoServer && String(form.data.server_id) !== String(autoServer.id)) {
            form.setData('server_id', String(autoServer.id));
        }

        const server = servers.find((s) => String(s.id) === serverIdToUse);
        const valids: string[] = [];
        const invalids: string[] = [];
        const invalidLineNumbers: number[] = [];

        lines.forEach((link, index) => {
            try {
                const domain = new URL(link).hostname;
                const isValid = server?.domains?.some((d) => domain.includes(d));
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

        const calculatedFinal = form.data.episode_initial + valids.length - 1;
        setEpisodeFinal(calculatedFinal);
    };

    const handleLinksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        form.setData('links', value);
        parseLinks(value);
    };

    const handleServerChange = (serverId: string) => {
        form.setData('server_id', serverId);
        parseLinks(form.data.links, serverId);
    };

    const handleEpisodeInitialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const initial = Number(e.target.value);
        form.setData('episode_initial', initial);
        setEpisodeFinal(initial + validLinks.length - 1);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const expectedLinks = episodeFinal - form.data.episode_initial + 1;

        if (validLinks.length !== expectedLinks) {
            alert(
                __('episodes.messages.link_count_mismatch', {
                    expected: expectedLinks,
                    actual: validLinks.length,
                }),
            );
            return;
        }

        if (validLinks.length > 0 && invalidLinks.length === 0) {
            console.log('Enlaces válidos para generar:', validLinks);
            form.post(route('episodes.generate-players', anime.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                    setLinkCount(0);
                    setInvalidLinks([]);
                    setValidLinks([]);
                    setInvalidLines([]);
                    setEpisodeFinal(form.data.episode_initial);
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-6xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{__('episodes.actions.generate', { anime: anime.name })}</DialogTitle>
                        <DialogDescription>{__('episodes.actions.generate_description', { anime: anime.name })}</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="grid gap-2">
                                <Label htmlFor="server_id">{__('episodes.labels.server')}</Label>
                                <Select value={form.data.server_id} onValueChange={handleServerChange} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder={__('episodes.placeholders.server')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {servers.map((server) => (
                                            <SelectItem key={server.id} value={String(server.id)}>
                                                {server.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="language">{__('episodes.labels.language')}</Label>
                                <Select value={form.data.language} onValueChange={(value) => form.setData('language', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={__('episodes.placeholders.language')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">{__('episodes.languages.sub')}</SelectItem>
                                        <SelectItem value="1">{__('episodes.languages.lat')}</SelectItem>
                                        <SelectItem value="2">{__('episodes.languages.cas')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="episode_initial">{__('episodes.labels.episode_initial')}</Label>
                                <Input
                                    id="episode_initial"
                                    type="number"
                                    min={1}
                                    value={form.data.episode_initial}
                                    onChange={handleEpisodeInitialChange}
                                    className="input"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="episode_final">{__('episodes.labels.episode_final')}</Label>
                                <Input id="episode_final" type="number" readOnly value={episodeFinal} className="cursor-not-allowed bg-muted" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="links">{__('episodes.labels.links')}</Label>
                            <TextareaWithLineNumbers
                                value={form.data.links}
                                onChange={handleLinksChange}
                                placeholder={__('episodes.placeholders.links')}
                                invalidLines={invalidLines}
                            />

                            <div className="mt-2 flex flex-wrap gap-2">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-muted-foreground">Total:</span>
                                    <Badge>{linkCount}</Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                    <span className="text-xs text-muted-foreground">Válidos:</span>
                                    <Badge variant="secondary">{validLinks.length}</Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                    <TriangleAlert className="h-3 w-3 text-yellow-600" />
                                    <span className="text-xs text-muted-foreground">Inválidos:</span>
                                    <Badge variant="destructive">{invalidLinks.length}</Badge>
                                </div>
                            </div>

                            {invalidLines.length > 0 && (
                                <div className="flex items-center gap-1 text-xs text-yellow-600">
                                    <AlertTriangle className="h-3 w-3" /> {__('episodes.messages.invalid_lines')}: {invalidLines.join(', ')}
                                </div>
                            )}
                            <InputError className="text-xs" message={form.errors.links} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                {__('common.actions.cancel')}
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={
                                form.processing || invalidLinks.length > 0 || validLinks.length !== episodeFinal - form.data.episode_initial + 1
                            }
                        >
                            {form.processing ? __('common.actions.processing') : __('episodes.actions.generate')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
