'use client';

import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function AlternativeNamesInputTags({ value, onChange, placeholder = 'Ingresa nombres alternativos separados por coma' }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const values = value
            ? value
                  .split(',')
                  .map((v) => v.trim())
                  .filter(Boolean)
            : [];
        setItems(values);
    }, [value]);

    const updateItems = (newItems: string[]) => {
        const merged = Array.from(new Set([...items, ...newItems.map((s) => s.trim()).filter(Boolean)]));
        setItems(merged);
        onChange(merged.join(','));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.includes(',')) {
            const parts = val
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
            updateItems(parts);
            setInputValue('');
        } else {
            setInputValue(val);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue.trim()) {
                updateItems([inputValue.trim()]);
                setInputValue('');
            }
        }

        if (e.key === 'Backspace' && inputValue === '' && items.length > 0) {
            const updated = [...items];
            updated.pop();
            setItems(updated);
            onChange(updated.join(','));
        }
    };

    const removeItem = (item: string) => {
        const filtered = items.filter((i) => i !== item);
        setItems(filtered);
        onChange(filtered.join(','));
    };

    return (
        <div
            className="flex cursor-text flex-wrap items-center gap-2 rounded-md border border-input px-3 py-2 text-xs"
            onClick={() => inputRef.current?.focus()}
        >
            {items.map((item) => (
                <Badge key={item} variant="secondary" className="flex cursor-default items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    {item}
                    <button
                        type="button"
                        className="ml-1 hover:text-red-500"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item);
                        }}
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}

            <input
                ref={inputRef}
                type="text"
                className="min-w-[100px] flex-1 border-none bg-transparent focus:outline-none"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
        </div>
    );
}
