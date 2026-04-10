import { eq } from 'drizzle-orm';
import { db, pool, users } from '../db';
import { IUserRepository, UserPublic, UserRow } from './interfaces';

export class UserRepository implements IUserRepository {
    async findById(id: number): Promise<UserPublic | null> {
        const result = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                createdAt: users.createdAt,
            })
            .from(users)
            .where(eq(users.id, id))
            .limit(1);

        if (result.length === 0) return null;

        const user = result[0];
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt ?? new Date(),
        };
    }

    async findByEmail(email: string): Promise<UserRow | null> {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (result.length === 0) return null;

        const user = result[0];
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            createdAt: user.createdAt ?? new Date(),
            updatedAt: user.updatedAt ?? new Date(),
        };
    }

    async create(name: string, email: string, passwordHash: string): Promise<number> {
        const [result] = await pool.execute(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, passwordHash]
        );
        const insertResult = result as { insertId: number };
        return insertResult.insertId;
    }

    async existsByEmail(email: string): Promise<boolean> {
        const result = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        return result.length > 0;
    }
}

export const userRepository = new UserRepository();
