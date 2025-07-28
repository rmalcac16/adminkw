export const animeTypes = [
    { key: 'all', value: 'all', label: 'Todos los tipos' },
    { key: 'tv', value: 'tv', label: 'TV' },
    { key: 'movie', value: 'movie', label: 'Película' },
    { key: 'special', value: 'special', label: 'Especial' },
    { key: 'ova', value: 'ova', label: 'OVA' },
    { key: 'ona', value: 'ona', label: 'ONA' },
];

export const getAnimeTypeLabel = (value: string) => {
    if (value === 'all') return 'Todos';
    const type = animeTypes.find((t) => t.value === String(value));
    return type ? type.label : 'Desconocido';
};
