import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface UserRow extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
}

export interface UserPublic extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}