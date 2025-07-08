export function shortenText(
    text: string | null | undefined,
    options?: {
        startWords?: number;
        endWords?: number;
        minWordsToShorten?: number;
        separator?: string;
    },
): string {
    if (!text) return '';

    const { startWords = 3, endWords = 3, minWordsToShorten = 10, separator = '…' } = options || {};

    const words = text.trim().split(/\s+/);
    if (words.length <= minWordsToShorten) return text;

    return [...words.slice(0, startWords), separator, ...words.slice(-endWords)].join(' ');
}
