import { mysqlTable, int, timestamp, uniqueIndex } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const likes = mysqlTable('likes', {
    id: int('id').primaryKey().autoincrement(),
    userId: int('user_id').notNull(),
    propertyId: int('property_id').notNull(),
    createdAt: timestamp('created_at').default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => ({
    uniqueLike: uniqueIndex('unique_like').on(table.userId, table.propertyId),
}));
