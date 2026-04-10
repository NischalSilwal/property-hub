import { mysqlTable, varchar, int, text, decimal, timestamp } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const properties = mysqlTable('properties', {
    id: int('id').primaryKey().autoincrement(),
    title: varchar('title', { length: 255 }).notNull(),
    location: varchar('location', { length: 255 }).notNull(),
    price: decimal('price', { precision: 15, scale: 2 }).notNull(),
    bedrooms: int('bedrooms'),
    bathrooms: int('bathrooms'),
    sqft: int('sqft'),
    description: text('description'),
    createdAt: timestamp('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: timestamp('updated_at').default(sql`(CURRENT_TIMESTAMP)`).onUpdateNow(),
});
