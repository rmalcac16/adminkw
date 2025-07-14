export interface UserData {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    password: string;
    remember_token: string | null;
    isPremium: boolean;
    image: string | null;
    created_at: string;
    updated_at: string;
}
