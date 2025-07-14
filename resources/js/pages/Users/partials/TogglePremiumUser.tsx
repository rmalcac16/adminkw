import { Toggle } from '@/components/ui/toggle';
import { router } from '@inertiajs/react';
import { Check, Loader2, Star } from 'lucide-react';
import { useState } from 'react';

interface Props {
    userId: number;
    isPremium: boolean;
}

export function TogglePremium({ userId, isPremium }: Props) {
    const [processing, setProcessing] = useState(false);

    const togglePremium = (value: boolean) => {
        setProcessing(true);
        router.put(
            route('users.toggle-premium', { user: userId }),
            { isPremium: value },
            {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <Toggle aria-label="Toggle premium" pressed={isPremium} onPressedChange={togglePremium} variant="outline" disabled={processing}>
            {processing ? (
                <Loader2 className="animate-spin" />
            ) : isPremium ? (
                <Star className="text-yellow-500" />
            ) : (
                <Check className="text-gray-500" />
            )}
        </Toggle>
    );
}
