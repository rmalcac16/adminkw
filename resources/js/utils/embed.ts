import { ServerData } from '@/types/server';

/**
 * Verifica si la URL pertenece a alguno de los dominios permitidos del servidor
 */
function isDomainAllowed(url: URL, server: ServerData): boolean {
    const host = url.hostname.replace(/^www\./, '');
    return (server.domains || []).some((domain) => host.includes(domain));
}

/**
 * Intenta extraer el ID del video de la URL en base a patrones conocidos.
 */
function extractVideoId(url: URL): string | null {
    const segments = url.pathname.split('/').filter(Boolean);

    if (segments.length === 0) return null;

    // 1️⃣ Patrones con prefijos comunes (/d/:id, /e/:id, /v/:id, /s/:id)
    if (['d', 'e', 'v', 's'].includes(segments[0]) && segments[1]) {
        return segments[1];
    }

    // 2️⃣ Caso directo: /:id o /:id/filename
    if (segments[0]) {
        return segments[0];
    }

    return null;
}

/**
 * Normaliza un enlace de video para convertirlo en embed.
 *
 * @param originalUrl URL original que el usuario pega
 * @param server Servidor al cual se quiere asociar el enlace
 * @returns URL lista para usar en un iframe o null si el dominio no es válido
 */
export function normalizeEmbedUrl(originalUrl: string, server: ServerData): string | null {
    try {
        const url = new URL(originalUrl.trim());

        // Validar dominio permitido
        if (!isDomainAllowed(url, server)) {
            return null;
        }

        const videoId = extractVideoId(url);
        if (!videoId) return null;

        const cleanDomain = (server.embed ?? '').replace(/\/$/, '');
        return `${cleanDomain}/e/${videoId}`;
    } catch {
        return null;
    }
}
