'use client';

import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { useForm } from '@inertiajs/react';
import { Loader2, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function ClearGenreCacheButton() {
    const { __ } = useLang();

    const { post, errors, processing, recentlySuccessful } = useForm({
        _method: 'POST',
    });

    const handleClear = async () => {
        if (!route().has('cache.genres.clear')) {
            toast.error(__('genres.cache.clear_route_not_found'));
            return;
        }

        post(route('cache.genres.clear'), {
            onSuccess: () => {
                toast.success(__('genres.cache.cleared'));
            },
            onError: (error) => {
                toast.error(error.message || __('genres.cache.clear_failed'));
            },
            preserveScroll: true,
        });
    };

    return (
        <Button onClick={handleClear} disabled={processing} variant="outline">
            {processing ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {__('common.clearing_cache')}
                </>
            ) : (
                <>
                    <RefreshCcw className="h-4 w-4" />
                    {__('common.clear_cache')}
                </>
            )}
        </Button>
    );
}
