// ServerPlayerInput.tsx
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ServerData } from '@/types/server';
import { X } from 'lucide-react';

interface ServerPlayerInputProps {
    server: ServerData;
    value: string;
    onChange: (newCode: string) => void;
    onRemove: () => void; // Nueva prop para eliminar
    error?: string;
}

export function ServerPlayerInput({ server, value, onChange, onRemove, error }: ServerPlayerInputProps) {
    return (
        <div className="relative rounded-md border p-3 shadow-sm">
            {/* Botón de eliminar */}
            <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={onRemove}>
                <X className="h-4 w-4" />
            </Button>

            <Label htmlFor={`server-${server.id}`} className="mb-2 block text-center text-sm font-medium">
                {server.title}
            </Label>
            <Input
                id={`server-${server.id}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enlace para ${server.title}`}
                className="h-9 text-sm"
            />
            {error && <InputError message={error} className="mt-1 text-xs" />}
        </div>
    );
}
