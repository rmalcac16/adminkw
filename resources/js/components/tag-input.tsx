import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useState } from 'react';

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag]);
                setInputValue('');
            }
        } else if (e.key === 'Backspace' && !inputValue) {
            onChange(value.slice(0, -1));
        }
    };

    const handleBlur = () => {
        const newTag = inputValue.trim();
        if (newTag && !value.includes(newTag)) {
            onChange([...value, newTag]);
            setInputValue('');
        }
    };

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag));
    };

    return (
        <div
            className="flex flex-wrap items-center gap-2 rounded-md border px-2 py-1"
            onClick={(e) => {
                e.stopPropagation();
                e.currentTarget.querySelector('input')?.focus();
            }}
        >
            {value.map((tag) => (
                <Badge key={tag} variant="secondary">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="cursor-pointer text-muted-foreground hover:text-red-500">
                        <X size={12} />
                    </button>
                </Badge>
            ))}
            <Input
                className="border-none p-1 ring-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder={placeholder ?? 'Agregar...'}
            />
        </div>
    );
}
