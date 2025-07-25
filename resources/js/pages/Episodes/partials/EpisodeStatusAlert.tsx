// components/EpisodeStatusAlert.tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { CheckCircle2, Info, TriangleAlert } from 'lucide-react';

type AlertType = 'warning' | 'info' | 'success';

interface EpisodeStatusAlertProps {
    missingEpisodes?: number[];
    type?: AlertType;
    title?: string;
    description?: string;
    actionButton?: {
        label: string;
        href?: string;
        onClick?: () => void;
        variant?: 'link' | 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
    };
    className?: string;
}

export function EpisodeStatusAlert({ missingEpisodes = [], type = 'warning', title, description, actionButton, className }: EpisodeStatusAlertProps) {
    if (type === 'warning' && missingEpisodes.length === 0) return null;

    const defaultTitle =
        title ||
        {
            warning: '¡Atención!',
            info: 'Información',
            success: 'Éxito',
        }[type];

    const defaultDescription =
        description ||
        (type === 'warning'
            ? `Faltan ${missingEpisodes.length} episodio(s): ${missingEpisodes.join(', ')}.`
            : type === 'info'
              ? 'Esta es una alerta informativa.'
              : 'Operación completada con éxito.');

    const Icon = {
        warning: TriangleAlert,
        info: Info,
        success: CheckCircle2,
    }[type];

    return (
        <Alert variant="default" className={className}>
            <Icon className="h-4 w-4" />
            <AlertTitle>{defaultTitle}</AlertTitle>
            <AlertDescription className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span>{defaultDescription}</span>
                {actionButton &&
                    (actionButton.href ? (
                        <Link href={actionButton.href} className="flex-shrink-0">
                            <Button variant={actionButton.variant || 'link'} size="sm">
                                {actionButton.label}
                            </Button>
                        </Link>
                    ) : (
                        <Button onClick={actionButton.onClick} variant={actionButton.variant || 'link'} size="sm" className="flex-shrink-0">
                            {actionButton.label}
                        </Button>
                    ))}
            </AlertDescription>
        </Alert>
    );
}
