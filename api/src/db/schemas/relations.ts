import { relations } from 'drizzle-orm';
import { users } from './user.schema';
import { properties } from './property.schema';
import { favorites } from './favorite.schema';
import { likes } from './like.schema';

export const usersRelations = relations(users, ({ many }) => ({
    favorites: many(favorites),
    likes: many(likes),
}));

export const propertiesRelations = relations(properties, ({ many }) => ({
    favorites: many(favorites),
    likes: many(likes),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
    user: one(users, { fields: [favorites.userId], references: [users.id] }),
    property: one(properties, { fields: [favorites.propertyId], references: [properties.id] }),
}));

export const likesRelations = relations(likes, ({ one }) => ({
    user: one(users, { fields: [likes.userId], references: [users.id] }),
    property: one(properties, { fields: [likes.propertyId], references: [properties.id] }),
}));
