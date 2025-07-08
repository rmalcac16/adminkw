export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}
