import { Button } from '@/components/ui/button';
import { useUploadServers } from '@/hooks/useUploadServers';
import { useRef } from 'react';

export default function UploadSection() {
    const fileRef = useRef<HTMLInputElement>(null);
    const { servers, loading, error, refetch, uploadToServer } = useUploadServers();

    const handleUpload = () => {
        const file = fileRef.current?.files?.[0];
        if (!file) return alert('Selecciona un archivo primero');

        servers.forEach((server) => {
            uploadToServer(server, file);
        });
    };

    return (
        <div className="space-y-2 text-sm">
            <input type="file" ref={fileRef} accept="video/mp4" />
            <Button onClick={handleUpload} disabled={loading || servers.length === 0}>
                Subir a todos los servidores
            </Button>

            <div className="grid gap-1">
                {servers.map((server) => (
                    <div key={server.key} className="rounded-md border p-2 text-xs">
                        <strong>{server.title}</strong>
                        <br />
                        {server.uploading && <span className="text-yellow-600">Subiendo... {server.progress ?? 0}%</span>}
                        {server.response && <span className="text-green-600">✔ Subido correctamente</span>}
                        {server.error && <span className="text-red-600">✖ Error: {server.error}</span>}
                    </div>
                ))}
            </div>

            {error && <div className="text-red-600">{error}</div>}
        </div>
    );
}
