import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useLang } from '@/hooks/useLang';
import { ServerData } from '@/types/server';
import { useForm } from '@inertiajs/react';
import { Pencil, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export function ServerDialogForm({ server, triggerType = 'button' }: { server?: ServerData; triggerType?: 'icon' | 'button' }) {
    const { __ } = useLang();
    const isEdit = !!server;
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: server?.title ?? '',
        embed: server?.embed ?? '',
        status: server?.status ?? 1,
        position: server?.position ?? 1,
        show_on_web_desktop: server?.show_on_web_desktop ?? true,
        show_on_web_mobile: server?.show_on_web_mobile ?? true,
        show_on_app: server?.show_on_app ?? true,
        _method: isEdit ? 'put' : 'post',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const onSuccess = () => {
            reset();
            setOpen(false);
        };

        const url = isEdit ? route('servers.update', server!.id) : route('servers.store');
        post(url, { onSuccess });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerType === 'button' ? (
                    <Button>
                        <PlusIcon />
                        {__('servers.create.button')}
                    </Button>
                ) : (
                    <Button variant="secondary" size="icon" className="size-8">
                        <Pencil />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? __('servers.edit.title') : __('servers.create.title')}</DialogTitle>
                        <DialogDescription>{isEdit ? __('servers.edit.description') : __('servers.create.description')}</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="title">{__('servers.form.title')}</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required autoFocus />
                                {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="position">{__('servers.form.position')}</Label>
                                <Input
                                    id="position"
                                    type="number"
                                    value={data.position ?? ''}
                                    onChange={(e) => setData('position', parseInt(e.target.value))}
                                />
                                {errors.position && <p className="text-xs text-red-400">{errors.position}</p>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="embed">{__('servers.form.embed')}</Label>
                            <Input id="embed" value={data.embed ?? ''} onChange={(e) => setData('embed', e.target.value)} />
                            {errors.embed && <p className="text-xs text-red-400">{errors.embed}</p>}
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <div>
                                <Label htmlFor="status">{__('servers.form.status')}</Label>
                                <p className="text-sm text-muted-foreground">
                                    {data.status ? __('servers.statuses.active') : __('servers.statuses.inactive')}
                                </p>
                            </div>
                            <Switch id="status" checked={!!data.status} onCheckedChange={(checked) => setData('status', checked)} />
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <Label className="mb-2 block">{__('servers.form.show')}</Label>
                            <ToggleGroup
                                type="multiple"
                                size="sm"
                                value={
                                    [data.show_on_web_desktop && 'desktop', data.show_on_web_mobile && 'mobile', data.show_on_app && 'app'].filter(
                                        Boolean,
                                    ) as string[]
                                }
                                onValueChange={(values: string[]) => {
                                    setData('show_on_web_desktop', values.includes('desktop'));
                                    setData('show_on_web_mobile', values.includes('mobile'));
                                    setData('show_on_app', values.includes('app'));
                                }}
                                className="flex flex-wrap"
                                variant="outline"
                            >
                                <ToggleGroupItem className="px-4 text-xs hover:data-[state=off]:bg-muted/30 data-[state=on]:bg-muted" value="desktop">
                                    {__('servers.form.web_desktop')}
                                </ToggleGroupItem>

                                <ToggleGroupItem className="px-4 text-xs hover:data-[state=off]:bg-muted/30 data-[state=on]:bg-muted" value="mobile">
                                    {__('servers.form.web_mobile')}
                                </ToggleGroupItem>

                                <ToggleGroupItem className="px-4 text-xs hover:data-[state=off]:bg-muted/30 data-[state=on]:bg-muted" value="app">
                                    {__('servers.form.app')}
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                {__('common.cancel')}
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {isEdit ? __('common.update') : __('common.save')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
