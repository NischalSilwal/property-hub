import { eq, count, desc, and } from 'drizzle-orm';
import { db, pool, properties, likes, favorites } from '../db';
import { IPropertyRepository, PropertyRow, CreatePropertyInput } from './interfaces';

export class PropertyRepository implements IPropertyRepository {
    async findById(id: number): Promise<PropertyRow | null> {
        const result = await db
            .select()
            .from(properties)
            .where(eq(properties.id, id))
            .limit(1);

        if (result.length === 0) return null;

        const prop = result[0];
        return {
            id: prop.id,
            title: prop.title,
            location: prop.location,
            price: Number(prop.price),
            bedrooms: prop.bedrooms ?? undefined,
            bathrooms: prop.bathrooms ?? undefined,
            sqft: prop.sqft ?? undefined,
            description: prop.description ?? undefined,
            likeCount: 0,
            isLiked: false,
            isFavorited: false,
            createdAt: prop.createdAt ?? new Date(),
            updatedAt: prop.updatedAt ?? new Date(),
        };
    }

    async findByIdWithCounts(id: number, userId?: number): Promise<PropertyRow | null> {
        const property = await this.findById(id);
        if (!property) return null;

        const [likeResult] = await db
            .select({ count: count() })
            .from(likes)
            .where(eq(likes.propertyId, id));

        let isLiked = false;
        let isFavorited = false;

        if (userId) {
            const [like] = await db
                .select({ id: likes.id })
                .from(likes)
                .where(and(eq(likes.propertyId, id), eq(likes.userId, userId)))
                .limit(1);
            isLiked = like !== undefined;

            const [fav] = await db
                .select({ id: favorites.id })
                .from(favorites)
                .where(and(eq(favorites.propertyId, id), eq(favorites.userId, userId), eq(favorites.isActive, true)))
                .limit(1);
            isFavorited = fav !== undefined;
        }

        return {
            ...property,
            likeCount: Number(likeResult?.count ?? 0),
            isLiked,
            isFavorited,
        };
    }

    async findAll(): Promise<PropertyRow[]> {
        const result = await db
            .select()
            .from(properties)
            .orderBy(desc(properties.createdAt));

        return result.map((prop) => ({
            id: prop.id,
            title: prop.title,
            location: prop.location,
            price: Number(prop.price),
            bedrooms: prop.bedrooms ?? undefined,
            bathrooms: prop.bathrooms ?? undefined,
            sqft: prop.sqft ?? undefined,
            description: prop.description ?? undefined,
            likeCount: 0,
            isLiked: false,
            isFavorited: false,
            createdAt: prop.createdAt ?? new Date(),
            updatedAt: prop.updatedAt ?? new Date(),
        }));
    }

    async findAllWithCounts(userId?: number): Promise<PropertyRow[]> {
        const allProperties = await this.findAll();

        return Promise.all(
            allProperties.map(async (prop) => {
                const counts = await this.findByIdWithCounts(prop.id, userId);
                return {
                    ...prop,
                    likeCount: counts?.likeCount ?? 0,
                    isLiked: counts?.isLiked ?? false,
                    isFavorited: counts?.isFavorited ?? false,
                };
            })
        );
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.execute(
            'DELETE FROM properties WHERE id = ?',
            [id]
        );
        const deleteResult = result as { affectedRows: number };
        return deleteResult.affectedRows > 0;
    }

    async create(data: CreatePropertyInput, userId: number): Promise<number> {
        const [result] = await pool.execute(
            `INSERT INTO properties (title, location, price, bedrooms, bathrooms, sqft, description, user_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.title,
                data.location,
                data.price,
                data.bedrooms ?? null,
                data.bathrooms ?? null,
                data.sqft ?? null,
                data.description ?? null,
                userId,
            ]
        );
        const insertResult = result as { insertId: number };
        return insertResult.insertId;
    }
}

export const propertyRepository = new PropertyRepository();
