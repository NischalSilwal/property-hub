export interface User {
    id: number;
    name: string;
    email: string;
    role?: 'buyer' | 'broker' | 'admin';
    created_at: Date;
}
