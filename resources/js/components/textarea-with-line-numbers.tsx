import React, { useEffect, useRef, useState } from 'react';

interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    invalidLines?: number[];
}

const TextareaWithLineNumbers: React.FC<Props> = ({ value, onChange, placeholder = '', invalidLines = [] }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const [lineCount, setLineCount] = useState(1);

    useEffect(() => {
        setLineCount(value.split('\n').length || 1);
    }, [value]);

    const syncScroll = () => {
        if (textareaRef.current && lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    return (
        <div className="relative flex h-72 rounded-xl border bg-background font-mono text-sm text-foreground">
            {/* Números de línea */}
            <div ref={lineNumbersRef} className="w-12 overflow-hidden rounded-l-xl bg-muted px-1 py-2 text-right text-muted-foreground select-none">
                <div>
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i} className={invalidLines.includes(i + 1) ? 'text-destructive' : undefined}>
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Textarea */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                onScroll={syncScroll}
                placeholder={placeholder}
                className="scrollbar-none h-full flex-1 resize-none border-none bg-transparent px-3 py-2 leading-5 text-inherit outline-none focus:outline-none"
                style={{
                    fontFamily: 'inherit',
                }}
            />
        </div>
    );
};

export default TextareaWithLineNumbers;
