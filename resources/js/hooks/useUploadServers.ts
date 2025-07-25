// hooks/useUploadServers.ts
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Server {
    title: string;
    upload_url: string | null;
    key: string;
    error?: string;
    uploading?: boolean;
    progress?: number;
    response?: any;
}

export function useUploadServers() {
    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchServers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/upload/servers');
            setServers(response.data);
            setError(null);
        } catch (err) {
            setError('No se pudo obtener los servidores.');
            console.error('[FetchServers] Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const uploadToServer = async (server: Server, file: File) => {
        if (!server.upload_url || !server.key) return;

        const formData = new FormData();
        formData.append('key', server.key);
        formData.append('html_redirect', '0');
        formData.append('file', file);

        updateServer(server.key, { uploading: true, progress: 0 });

        try {
            const response = await axios.post(server.upload_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (e) => {
                    const percent = Math.round((e.loaded * 100) / (e.total ?? 1));
                    updateServer(server.key, { progress: percent });
                    console.log(`[Upload] ${server.title}: ${percent}%`);
                },
            });

            updateServer(server.key, {
                uploading: false,
                response: response.data,
                error: undefined,
            });

            console.log(`[Upload] ${server.title} OK`, response.data);
        } catch (err: any) {
            updateServer(server.key, {
                uploading: false,
                error: err?.message ?? 'Error al subir',
            });
            console.error(`[Upload] ${server.title} FAIL`, err);
        }
    };

    const updateServer = (key: string, updates: Partial<Server>) => {
        setServers((prev) => prev.map((s) => (s.key === key ? { ...s, ...updates } : s)));
    };

    const clearCache = () => {
        setServers([]);
    };

    useEffect(() => {
        fetchServers();
    }, []);

    return {
        servers,
        loading,
        error,
        refetch: fetchServers,
        clearCache,
        uploadToServer,
    };
}
