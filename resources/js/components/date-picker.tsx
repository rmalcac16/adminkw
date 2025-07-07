'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface DatePickerProps {
    date: string;
    onChange: (val: string) => void;
    placeholder?: string;
    className?: string;
}

export function DatePicker({ date, onChange, placeholder = 'Select date', className }: DatePickerProps) {
    const [open, setOpen] = React.useState(false);

    const selectedDate = date ? parseISO(date + 'T00:00:00') : undefined;

    const [month, setMonth] = React.useState<Date | undefined>(date ? parseISO(date + 'T00:00:00') : undefined);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className={`justify-between font-normal ${className || ''}`}>
                    {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : placeholder}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                        if (!date) return;
                        onChange(format(date, 'yyyy-MM-dd'));
                        setOpen(false);
                    }}
                    locale={es}
                />
            </PopoverContent>
        </Popover>
    );
}
