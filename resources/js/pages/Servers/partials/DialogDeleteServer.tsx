import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ServerData } from '@/types/server';
import { useForm } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export function DialogDeleteServer({ server, open, setOpen }: { server: ServerData; open: boolean; setOpen: (open: boolean) => void }) {
    const form = useForm({});

    const handleDelete = () => {
        if (!route().has('servers.destroy')) {
            toast.error('La ruta para eliminar el servidor no está definida.');
            return;
        }

        form.delete(route('servers.destroy', server.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Eliminar servidor
                    </DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que deseas eliminar el servidor <span className="font-semibold text-foreground">{server.title}</span>? Esta
                        acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild disabled={form.processing}>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleDelete} disabled={form.processing} variant="destructive">
                        {form.processing ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
