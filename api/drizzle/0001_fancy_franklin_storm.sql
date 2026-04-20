ALTER TABLE `favourites` DROP INDEX `unique_favourite`;--> statement-breakpoint
ALTER TABLE `favourites` DROP FOREIGN KEY `favourites_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `favourites` DROP FOREIGN KEY `favourites_property_id_properties_id_fk`;
--> statement-breakpoint
ALTER TABLE `likes` DROP FOREIGN KEY `likes_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `likes` DROP FOREIGN KEY `likes_property_id_properties_id_fk`;
--> statement-breakpoint
ALTER TABLE `properties` ADD `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `favourites` ADD CONSTRAINT `unique_favorite` UNIQUE(`user_id`,`property_id`);