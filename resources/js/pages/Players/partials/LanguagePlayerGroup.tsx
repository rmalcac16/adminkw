// LanguagePlayerGroup.tsx
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ServerData } from '@/types/server';
import { PlusCircle, X } from 'lucide-react';
import { ServerPlayerInput } from './ServerPlayerInput';

interface LanguagePlayerGroupProps {
    language: { value: number; label: string };
    allServers: ServerData[];
    form: any;
    onRemoveGroup: () => void;
    onAddServer: (server: ServerData) => void;
    onRemoveServer: (serverId: number) => void;
    updatePlayerCode: (serverId: number, newCode: string) => void;
}

export function LanguagePlayerGroup({
    language,
    allServers,
    form,
    onRemoveGroup,
    onAddServer,
    onRemoveServer,
    updatePlayerCode,
}: LanguagePlayerGroupProps) {
    // Filtra los reproductores del formulario que pertenecen a este grupo de idioma
    const playersInGroup = form.data.players.filter((p: any) => p.languaje === language.value);
    const displayedServerIds = playersInGroup.map((p: any) => p.server_id);

    // Determina qué servidores ya se muestran para no ofrecerlos de nuevo
    const availableServersToAdd = allServers.filter((s) => !displayedServerIds.includes(s.id));

    return (
        <div className="space-y-4 rounded-lg border bg-secondary/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{`Idioma: ${language.label}`}</h3>
                <div className="flex items-center gap-2">
                    {/* Menú para añadir servidores específicos a este grupo */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button type="button" variant="outline" size="sm" disabled={availableServersToAdd.length === 0}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Añadir Servidor
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {availableServersToAdd.map((server) => (
                                <DropdownMenuItem key={server.id} onSelect={() => onAddServer(server)}>
                                    {server.title}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button type="button" variant="ghost" size="icon" onClick={onRemoveGroup} aria-label="Eliminar grupo de idioma">
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Grid de servidores añadidos */}
            {playersInGroup.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {playersInGroup.map((player: any) => {
                        const server = allServers.find((s) => s.id === player.server_id);
                        if (!server) return null;

                        const playerIndex = form.data.players.findIndex((p: any) => p === player);
                        const error = form.errors[`players.${playerIndex}.code`];

                        return (
                            <ServerPlayerInput
                                key={server.id}
                                server={server}
                                value={player.code}
                                onChange={(newCode) => updatePlayerCode(server.id, newCode)}
                                onRemove={() => onRemoveServer(server.id)}
                                error={error}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="py-4 text-center text-sm text-muted-foreground">Añade servidores a este grupo de idioma.</div>
            )}
        </div>
    );
}
