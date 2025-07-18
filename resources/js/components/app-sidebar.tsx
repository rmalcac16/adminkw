import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useLang } from '@/hooks/useLang';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { File, LayoutGrid, ListFilter, Server, User2 } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { __ } = useLang();

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: __('common.animes'),
            href: route().has('animes.index') ? route('animes.index') : '#',
            icon: File,
        },
        {
            title: __('common.genres'),
            href: route().has('genres.index') ? route('genres.index') : '#',
            icon: ListFilter,
        },
        {
            title: __('common.servers'),
            href: route().has('servers.index') ? route('servers.index') : '#',
            icon: Server,
        },

        {
            title: __('common.users'),
            href: route().has('users.index') ? route('users.index') : '#',
            icon: User2,
        },
    ];

    const footerNavItems: NavItem[] = [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
