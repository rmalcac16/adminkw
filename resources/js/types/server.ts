export interface ServerData {
    id: number;
    title: string | null;
    embed: string | null;
    status: boolean | null;
    position: number | null;
    show_on_web_desktop: boolean;
    show_on_web_mobile: boolean;
    show_on_app: boolean;
    domains: string[] | null;
}
