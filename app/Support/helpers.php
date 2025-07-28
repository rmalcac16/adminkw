<?php


if (!function_exists('extractVideoData')) {
    /**
     * Extrae el ID del video y genera un backup URL estándar con /e/{id}.
     *
     * @param string|null $url
     * @return array|null
     */
    function extractVideoData(?string $url): ?array
    {
        if (empty($url)) {
            return null;
        }

        $parsed = parse_url($url);

        if (!isset($parsed['host'])) {
            return null;
        }

        $host = ($parsed['scheme'] ?? 'https') . '://' . $parsed['host'];

        $path = trim($parsed['path'] ?? '', '/');
        $segments = array_values(array_filter(explode('/', $path)));

        // elegir id (2º segmento si existe, si no el 1º)
        $id = $segments[1] ?? $segments[0] ?? null;

        if (!$id) {
            return null;
        }

        // limpiar extensiones de archivo
        $id = preg_replace('/\.(mp4|avi|mkv|mov|wmv|flv)$/i', '', $id);

        return [
            'id' => $id,
            'backupUrl' => $host . '/e/' . $id,
        ];
    }
}
