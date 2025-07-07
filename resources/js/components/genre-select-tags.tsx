'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GenreData } from '@/types/genre';
import { Check, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Props = {
    allGenres: GenreData[];
    value: string | null;
    onChange: (value: string | null) => void;
};

export default function GenresSelectTags({ allGenres, value, onChange }: Props) {
    const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

    useEffect(() => {
        const slugs = (value ?? '')
            .split(',')
            .map((slug) => slug.trim())
            .filter((slug) => slug.length > 0);

        const unique = [...new Set(slugs)];
        setSelectedSlugs(unique);
    }, [value]);

    const toggleGenre = (slug: string) => {
        const updated = selectedSlugs.includes(slug) ? selectedSlugs.filter((s) => s !== slug) : [...selectedSlugs, slug];

        const unique = [...new Set(updated)];
        setSelectedSlugs(unique);
        onChange(unique.length > 0 ? unique.join(',') : null);
    };

    const orderedGenres = useMemo(() => {
        const seen = new Set<string>();
        const uniqueGenres: GenreData[] = [];

        for (const genre of allGenres) {
            if (genre.slug && !seen.has(genre.slug)) {
                seen.add(genre.slug);
                uniqueGenres.push(genre);
            }
        }

        return uniqueGenres.sort((a, b) => (a.title ?? '').toLowerCase().localeCompare((b.title ?? '').toLowerCase()));
    }, [allGenres]);

    const slugToName = useMemo(() => {
        const map: Record<string, string> = {};
        for (const genre of orderedGenres) {
            if (genre.slug) {
                map[genre.slug] = genre.title ?? genre.slug;
            }
        }
        return map;
    }, [orderedGenres]);

    return (
        <div className="space-y-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        {selectedSlugs.length > 0 ? selectedSlugs.map((slug) => slugToName[slug] || slug).join(', ') : 'Seleccionar géneros'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar género..." />
                        <ScrollArea className="h-72">
                            <div className="grid grid-cols-2 gap-1 px-2 py-2">
                                {orderedGenres.map((genre) => (
                                    <CommandItem key={genre.slug} onSelect={() => genre.slug && toggleGenre(genre.slug)} className="cursor-pointer">
                                        {genre.slug && selectedSlugs.includes(genre.slug) ? (
                                            <Check className="mr-1 h-4 w-4 text-green-600" />
                                        ) : (
                                            <span className="w-5" />
                                        )}
                                        {genre.title}
                                    </CommandItem>
                                ))}
                            </div>
                        </ScrollArea>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2">
                {selectedSlugs.map((slug) => (
                    <Badge key={slug} variant="secondary" className="flex items-center gap-1">
                        {slugToName[slug] || slug}
                        <button type="button" className="ml-1 hover:text-red-500" onClick={() => toggleGenre(slug)}>
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
}
