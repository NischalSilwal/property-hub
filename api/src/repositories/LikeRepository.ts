import { eq, and, desc, count } from 'drizzle-orm';
import { db, pool, likes } from '../db';
import { ILikeRepository, LikeRow } from './interfaces';

export class LikeRepository implements ILikeRepository {
    async findByUserAndProperty(userId: number, propertyId: number): Promise<LikeRow | null> {
        const result = await db
            .select()
            .from(likes)
            .where(and(eq(likes.userId, userId), eq(likes.propertyId, propertyId)))
            .limit(1);

        if (result.length === 0) return null;

        const like = result[0];
        return {
            id: like.id,
            userId: like.userId,
            propertyId: like.propertyId,
            createdAt: like.createdAt ?? new Date(),
        };
    }

    async findByProperty(propertyId: number): Promise<LikeRow[]> {
        const result = await db
            .select()
            .from(likes)
            .where(eq(likes.propertyId, propertyId))
            .orderBy(desc(likes.createdAt));

        return result.map((like) => ({
            id: like.id,
            userId: like.userId,
            propertyId: like.propertyId,
            createdAt: like.createdAt ?? new Date(),
        }));
    }

    async findByUser(userId: number): Promise<LikeRow[]> {
        const result = await db
            .select()
            .from(likes)
            .where(eq(likes.userId, userId))
            .orderBy(desc(likes.createdAt));

        return result.map((like) => ({
            id: like.id,
            userId: like.userId,
            propertyId: like.propertyId,
            createdAt: like.createdAt ?? new Date(),
        }));
    }

    async create(userId: number, propertyId: number): Promise<number> {
        const [result] = await pool.execute(
            'INSERT INTO likes (user_id, property_id) VALUES (?, ?)',
            [userId, propertyId]
        );
        const insertResult = result as { insertId: number };
        return insertResult.insertId;
    }

    async delete(userId: number, propertyId: number): Promise<boolean> {
        const [result] = await pool.execute(
            'DELETE FROM likes WHERE user_id = ? AND property_id = ?',
            [userId, propertyId]
        );
        const deleteResult = result as { affectedRows: number };
        return deleteResult.affectedRows > 0;
    }

    async countByProperty(propertyId: number): Promise<number> {
        const [result] = await db
            .select({ count: count() })
            .from(likes)
            .where(eq(likes.propertyId, propertyId));

        return Number(result?.count ?? 0);
    }

    async exists(userId: number, propertyId: number): Promise<boolean> {
        const result = await db
            .select({ id: likes.id })
            .from(likes)
            .where(and(eq(likes.userId, userId), eq(likes.propertyId, propertyId)))
            .limit(1);

        return result.length > 0;
    }
}

export const likeRepository = new LikeRepository();
