import { eq, and, desc } from 'drizzle-orm';
import { db, pool, favorites } from '../db';
import { IFavoriteRepository, FavoriteRow } from './interfaces';

export class FavoriteRepository implements IFavoriteRepository {
    async findByUserAndProperty(userId: number, propertyId: number): Promise<FavoriteRow | null> {
        const result = await db
            .select()
            .from(favorites)
            .where(and(eq(favorites.userId, userId), eq(favorites.propertyId, propertyId)))
            .limit(1);

        if (result.length === 0) return null;

        const fav = result[0];
        return {
            id: fav.id,
            userId: fav.userId,
            propertyId: fav.propertyId,
            isActive: fav.isActive ?? false,
            createdAt: fav.createdAt ?? new Date(),
        };
    }

    async findByUser(userId: number): Promise<FavoriteRow[]> {
        const result = await db
            .select()
            .from(favorites)
            .where(and(eq(favorites.userId, userId), eq(favorites.isActive, true)))
            .orderBy(desc(favorites.createdAt));

        return result.map((fav) => ({
            id: fav.id,
            userId: fav.userId,
            propertyId: fav.propertyId,
            isActive: fav.isActive ?? false,
            createdAt: fav.createdAt ?? new Date(),
        }));
    }

    async create(userId: number, propertyId: number): Promise<number> {
        const [result] = await pool.execute(
            'INSERT INTO favourites (user_id, property_id, is_active) VALUES (?, ?, TRUE)',
            [userId, propertyId]
        );
        const insertResult = result as { insertId: number };
        return insertResult.insertId;
    }

    async toggle(userId: number, propertyId: number): Promise<boolean> {
        const existing = await this.findByUserAndProperty(userId, propertyId);
        if (!existing) return false;

        await pool.execute(
            'UPDATE favourites SET is_active = NOT is_active WHERE user_id = ? AND property_id = ?',
            [userId, propertyId]
        );

        return true;
    }

    async setActive(userId: number, propertyId: number, isActive: boolean): Promise<boolean> {
        const [result] = await pool.execute(
            'UPDATE favourites SET is_active = ? WHERE user_id = ? AND property_id = ?',
            [isActive, userId, propertyId]
        );
        const updateResult = result as { affectedRows: number };
        return updateResult.affectedRows > 0;
    }

    async delete(userId: number, propertyId: number): Promise<boolean> {
        const [result] = await pool.execute(
            'DELETE FROM favourites WHERE user_id = ? AND property_id = ?',
            [userId, propertyId]
        );
        const deleteResult = result as { affectedRows: number };
        return deleteResult.affectedRows > 0;
    }

    async exists(userId: number, propertyId: number): Promise<boolean> {
        const result = await db
            .select({ id: favorites.id })
            .from(favorites)
            .where(and(
                eq(favorites.userId, userId),
                eq(favorites.propertyId, propertyId),
                eq(favorites.isActive, true)
            ))
            .limit(1);

        return result.length > 0;
    }

    async findOrCreate(userId: number, propertyId: number): Promise<FavoriteRow> {
        const existing = await this.findByUserAndProperty(userId, propertyId);
        if (existing) return existing;

        const id = await this.create(userId, propertyId);
        return {
            id,
            userId,
            propertyId,
            isActive: true,
            createdAt: new Date(),
        };
    }
}

export const favoriteRepository = new FavoriteRepository();
