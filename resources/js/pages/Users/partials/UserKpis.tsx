import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';
import { Crown, MailCheck, Plus, User } from 'lucide-react';

interface Props {
    kpis: {
        total_users: number;
        premium_users: number;
        premium_percentage: number;
        verified_emails: number;
        verified_percentage: number;
        recent_users: number;
    };
}

export default function UserKpis({ kpis }: Props) {
    const { __ } = useLang();

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('users.kpis.total_users')}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-blue-500 p-2">
                            <User />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.total_users}</p>
                </CardContent>
            </Card>

            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('users.kpis.premium_users')}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-yellow-600 p-2">
                            <Crown />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.premium_users}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">
                        {kpis.premium_percentage}% {__('users.kpis.of_total')}
                    </p>
                </CardFooter>
            </Card>

            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('users.kpis.verified_emails')}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-green-500 p-2">
                            <MailCheck />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.verified_emails}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">
                        {kpis.verified_percentage}% {__('users.kpis.of_total')}
                    </p>
                </CardFooter>
            </Card>

            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('users.kpis.recent_users', { days: 30 })}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-purple-500 p-2">
                            <Plus />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.recent_users}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">{__('users.kpis.recent_users_description')}</p>
                </CardFooter>
            </Card>
        </div>
    );
}
