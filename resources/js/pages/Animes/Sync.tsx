import { Button } from '@/components/ui/button';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { useState } from 'react';

export default function Sync({ animesCount, missingMalId }: { animesCount: number; missingMalId: Record<number, string> }) {
    const [logs, setLogs] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    useEchoPublic(
        'anime-sync',
        'AnimeSyncProgress',
        (event: { message: string }) => {
            console.debug('[Echo] Evento recibido:', event);
            setLogs((prev) => [...prev, event.message]);
        },
        [logs],
    );

    const handleRun = () => {
        setIsRunning(true);
        setLogs((prev) => [...prev, '⚡ Iniciando proceso...']);
        router.post(
            route('animes.sync-mal.run'),
            {},
            {
                onFinish: () => setIsRunning(false),
            },
        );
    };

    return (
        <AppLayout>
            <Head title="Sincronizar Animes con MyAnimeList" />
            <div className="space-y-6 p-2 md:p-4">
                <div>
                    <h1 className="text-2xl font-bold">Sincronizar Animes con MyAnimeList</h1>
                    <p className="text-sm text-muted-foreground">
                        Esta página te permite sincronizar tus animes con MyAnimeList. El proceso puede tardar un poco, así que ten paciencia.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Animes en la base de datos</CardTitle>
                        <CardDescription className="text-4xl">{animesCount}</CardDescription>
                        <CardAction>
                            <Button onClick={handleRun} disabled={isRunning}>
                                {isRunning ? 'Procesando...' : 'Sincronizar'}
                            </Button>
                        </CardAction>
                    </CardHeader>
                </Card>

                {/* Terminal de logs */}
                <div className="h-96 overflow-y-scroll rounded-lg bg-black p-4 font-mono text-sm text-green-400">
                    {logs.length === 0 && <div className="text-gray-400">Esperando eventos...</div>}
                    {logs.map((log, index) => (
                        <div key={index}>{log}</div>
                    ))}
                </div>

                {/* Lista de animes sin mal_id */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Animes sin MAL ID</h2>
                    {Object.keys(missingMalId).length === 0 ? (
                        <p className="text-sm text-gray-500">Todos los animes tienen MAL ID 👍</p>
                    ) : (
                        <ul className="mt-2 list-inside list-disc text-sm text-red-500">
                            {Object.entries(missingMalId).map(([id, name]) => (
                                <li key={id}>
                                    {name} <span className="text-gray-400">(ID {id})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
