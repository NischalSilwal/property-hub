import { mysqlTable, int, boolean, timestamp, uniqueIndex } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const favorites = mysqlTable('favourites', {
    id: int('id').primaryKey().autoincrement(),
    userId: int('user_id').notNull(),
    propertyId: int('property_id').notNull(),
    isActive: boolean('is_active').default(sql`TRUE`),
    createdAt: timestamp('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: timestamp('updated_at').default(sql`(CURRENT_TIMESTAMP)`).onUpdateNow(),
}, (table) => ({
    uniqueFavorite: uniqueIndex('unique_favorite').on(table.userId, table.propertyId),
}));
