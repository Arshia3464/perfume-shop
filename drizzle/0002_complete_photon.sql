PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cart_item` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`product_id` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_cart_item`("id", "user_id", "product_id", "quantity") SELECT "id", "user_id", "product_id", "quantity" FROM `cart_item`;--> statement-breakpoint
DROP TABLE `cart_item`;--> statement-breakpoint
ALTER TABLE `__new_cart_item` RENAME TO `cart_item`;--> statement-breakpoint
PRAGMA foreign_keys=ON;