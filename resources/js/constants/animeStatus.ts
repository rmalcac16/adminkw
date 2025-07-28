export const animeStatuses = [
    { key: 'all', value: 'all', label: 'Todos los estados' },
    { key: 0, value: '0', label: 'Finalizado' },
    { key: 1, value: '1', label: 'En emisión' },
    { key: 2, value: '2', label: 'Pausado' },
    { key: 3, value: '3', label: 'No emitido aún' },
];

export const getAnimeStatusLabel = (value: string | number) => {
    if (value === 'all') return 'Todos'; // manejamos "all"
    const status = animeStatuses.find((s) => s.value === String(value));
    return status ? status.label : 'Desconocido';
};
