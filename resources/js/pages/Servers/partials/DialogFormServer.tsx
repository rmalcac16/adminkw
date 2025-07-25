import InputError from '@/components/input-error';
import { TagInput } from '@/components/tag-input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ServerData } from '@/types/server';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export function DialogFormServer({ server, open, setOpen }: { server?: ServerData; open: boolean; setOpen: (open: boolean) => void }) {
    const isEdit = !!server;

    const form = useForm({
        title: server?.title ?? '',
        embed: server?.embed ?? '',
        status: server?.status ?? 1,
        position: server?.position ?? 1,
        show_on_web_desktop: server?.show_on_web_desktop ?? true,
        show_on_web_mobile: server?.show_on_web_mobile ?? true,
        show_on_app: server?.show_on_app ?? true,
        domains: server?.domains ?? [],
        _method: isEdit ? 'put' : 'post',
    });

    useEffect(() => {
        if (open) {
            form.reset();
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(isEdit ? route('servers.update', server!.id) : route('servers.store'), {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Editar servidor' : 'Crear servidor'}</DialogTitle>
                        <DialogDescription>{isEdit ? 'Edita los detalles del servidor' : 'Crea un nuevo servidor'}</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    id="title"
                                    value={form.data.title}
                                    onChange={(e) => form.setData('title', e.target.value)}
                                    required
                                    autoFocus
                                    placeholder="Gamma"
                                />
                                <InputError message={form.errors.title} className="text-xs" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="position">Posición</Label>
                                <Input
                                    id="position"
                                    type="number"
                                    value={form.data.position}
                                    onChange={(e) => form.setData('position', parseInt(e.target.value))}
                                    placeholder="1"
                                />
                                <InputError message={form.errors.position} className="text-xs" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="embed">Dominio (Url)</Label>
                            <Input
                                id="embed"
                                value={form.data.embed ?? ''}
                                onChange={(e) => form.setData('embed', e.target.value)}
                                required
                                placeholder="https://example.com/"
                            />
                            <InputError message={form.errors.embed} className="text-xs" />
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <div>
                                <Label htmlFor="status">Estado</Label>
                                <p className="text-sm text-muted-foreground">{form.data.status ? 'Activo' : 'Inactivo'}</p>
                            </div>
                            <Switch id="status" checked={!!form.data.status} onCheckedChange={(checked) => form.setData('status', checked)} />
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <Label className="mb-2 block">Mostrar en</Label>
                            <ToggleGroup
                                type="multiple"
                                size="sm"
                                value={
                                    [
                                        form.data.show_on_web_desktop && 'desktop',
                                        form.data.show_on_web_mobile && 'mobile',
                                        form.data.show_on_app && 'app',
                                    ].filter(Boolean) as string[]
                                }
                                onValueChange={(values: string[]) => {
                                    form.setData('show_on_web_desktop', values.includes('desktop'));
                                    form.setData('show_on_web_mobile', values.includes('mobile'));
                                    form.setData('show_on_app', values.includes('app'));
                                }}
                                className="flex flex-wrap"
                                variant="outline"
                            >
                                <ToggleGroupItem className="px-4 text-xs hover:data-[state=off]:bg-muted/30 data-[state=on]:bg-muted" value="desktop">
                                    Escritorio
                                </ToggleGroupItem>
                                <ToggleGroupItem className="px-4 text-xs hover:data-[state=off]:bg-muted/30 data-[state=on]:bg-muted" value="mobile">
                                    Móvil
                                </ToggleGroupItem>
                                <ToggleGroupItem className="px-4 text-xs hover:data-[state=off]:bg-muted/30 data-[state=on]:bg-muted" value="app">
                                    Aplicación
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="domains">Dominios</Label>
                            <TagInput
                                value={form.data.domains}
                                onChange={(tags) => form.setData('domains', tags)}
                                placeholder="voe.sx, nuevo.co..."
                            />
                            <InputError message={form.errors.domains} className="text-xs" />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? (isEdit ? 'Actualizando...' : 'Guardando...') : isEdit ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
