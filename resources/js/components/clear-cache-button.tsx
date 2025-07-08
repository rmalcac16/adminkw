'use client';

import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { useForm } from '@inertiajs/react';
import { Loader2, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

type ClearCacheButtonProps = {
    routeName: string;
    labelKey: string;
    routeParams?: Record<string, any>;
};

export default function ClearCacheButton({ routeName, labelKey, routeParams = {} }: ClearCacheButtonProps) {
    const { __ } = useLang();
    const { post, processing } = useForm({ _method: 'POST' });

    const handleClear = async () => {
        if (!route().has(routeName)) {
            toast.error(__(`common.cache.clear_route_not_found`, { type: __(`common.${labelKey}`) }));
            return;
        }

        post(route(routeName, routeParams), {
            onSuccess: () => {
                toast.success(__(`common.cache.cleared`, { type: __(`common.${labelKey}`) }));
            },
            onError: () => {
                toast.error(__(`common.cache.clear_failed`, { type: __(`common.${labelKey}`) }));
            },
            preserveScroll: true,
        });
    };

    return (
        <Button onClick={handleClear} disabled={processing} variant="outline">
            {processing ? (
                <>
                    <Loader2 className="animate-spin" />
                    <span>{__('common.cache.clearing')}</span>
                </>
            ) : (
                <>
                    <RefreshCcw />
                    <span>{__('common.cache.clear')}</span>
                </>
            )}
        </Button>
    );
}
