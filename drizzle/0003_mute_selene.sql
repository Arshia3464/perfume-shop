CREATE TABLE `slider_item` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`text` text,
	`image` text,
	`order` integer DEFAULT 0 NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE cascade
);
