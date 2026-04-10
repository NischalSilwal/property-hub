import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database';
import { UserPublic, UserRow } from '../interfaces/user';


export const UserModel = {
    findById: async (id: number): Promise<UserPublic | null> => {
        const [rows] = await pool.query<UserPublic[]>(
            'SELECT id, name, email, created_at FROM users WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    },

    findByEmail: async (email: string): Promise<UserRow | null> => {
        const [rows] = await pool.query<UserRow[]>(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0] || null;
    },

    create: async (
        name: string,
        email: string,
        passwordHash: string
    ): Promise<number> => {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, passwordHash]
        );
        return result.insertId;
    },

    existsByEmail: async (email: string): Promise<boolean> => {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT 1 FROM users WHERE email = ? LIMIT 1',
            [email]
        );
        return rows.length > 0;
    },
};
