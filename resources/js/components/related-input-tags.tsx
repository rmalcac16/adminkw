import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function RelatedInputTags({ value, onChange, placeholder = 'Ingresa IDs separados por coma' }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        const values = value
            ? value
                  .split(',')
                  .map((v) => v.trim())
                  .filter(Boolean)
            : [];
        setItems(values);
    }, [value]);

    const updateItems = (rawItems: string[]) => {
        const filtered = rawItems.filter((s) => /^\d+$/.test(s));
        const merged = Array.from(new Set([...items, ...filtered]));
        const sorted = merged.sort((a, b) => Number(a) - Number(b));
        setItems(sorted);
        onChange(sorted.join(','));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.includes(',')) {
            const parts = value
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
            updateItems(parts);
            setInputValue('');
        } else {
            setInputValue(value);
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
    };

    const removeItem = (id: string) => {
        const filtered = items.filter((item) => item !== id);
        setItems(filtered);
        onChange(filtered.join(','));
    };

    return (
        <div className="space-y-2">
            <Input placeholder={placeholder} value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <Badge key={item} variant="secondary" className="flex items-center gap-1">
                        {item}
                        <button type="button" className="ml-1 hover:text-red-500" onClick={() => removeItem(item)}>
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
}
