'use client';

import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    validate?: (item: string) => boolean; // función opcional de validación
};

export default function InputTags({ value, onChange, placeholder = 'Ingresa valores separados por coma o enter', validate }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const values = value
            ? value
                  .split(',')
                  .map((v) => v.trim())
                  .filter((v) => v.length > 0)
            : [];
        setItems(values);
    }, [value]);

    const updateItems = (newItems: string[]) => {
        const cleaned = newItems
            .map((s) => s.trim())
            .filter((s) => s.length > 0 && !items.includes(s))
            .filter((s) => (validate ? validate(s) : true));

        const merged = [...items, ...cleaned];
        setItems(merged);
        onChange(merged.join(','));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.includes(',')) {
            const parts = val.split(',').map((s) => s.trim());
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
            className="flex cursor-text flex-wrap items-center gap-2 rounded-md border border-input px-3 py-2 text-sm"
            onClick={() => inputRef.current?.focus()}
        >
            {items.map((item) => (
                <Badge key={item} variant="secondary" className="flex items-center gap-1">
                    {item}
                    <button
                        type="button"
                        className="ml-1 text-muted-foreground hover:text-red-500"
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
                className="min-w-[100px] flex-1 border-none bg-transparent text-sm focus:outline-none"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
        </div>
    );
}
