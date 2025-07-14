import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/useLang';
import { Film, Layers3, Server, Star, TrendingUp, Users } from 'lucide-react';

interface Props {
    kpis: {
        totalAnimes: {
            value: number;
            growth: number;
        };
        totalEpisodes: number;
        totalUsers: number;
        activeUsers: number;
        genres: number;
        servers: number;
    };
}

export default function DashboardKpis({ kpis }: Props) {
    const { __ } = useLang();

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('dashboard.kpis.total_animes')}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-indigo-500 p-2">
                            <Film />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.totalAnimes.value}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">
                        +{kpis.totalAnimes.growth}% {__('dashboard.kpis.this_month')}
                    </p>
                </CardFooter>
            </Card>

            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('dashboard.kpis.total_episodes')}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-blue-600 p-2">
                            <Layers3 />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.totalEpisodes.toLocaleString()}</p>
                </CardContent>
            </Card>

            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('dashboard.kpis.total_users')}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-emerald-600 p-2">
                            <Users />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.totalUsers.toLocaleString()}</p>
                </CardContent>
            </Card>

            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('dashboard.kpis.premium_users')}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-yellow-500 p-2">
                            <Star />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.activeUsers.toLocaleString()}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">{__('dashboard.kpis.premium_description')}</p>
                </CardFooter>
            </Card>

            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('dashboard.kpis.genres')}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-pink-500 p-2">
                            <TrendingUp />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.genres}</p>
                </CardContent>
            </Card>

            <Card className="gap-0">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{__('dashboard.kpis.servers')}</CardTitle>
                    <CardAction>
                        <div className="rounded-full bg-gray-600 p-2">
                            <Server />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold lg:text-3xl">{kpis.servers}</p>
                </CardContent>
            </Card>
        </div>
    );
}
