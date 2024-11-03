CREATE TABLE `materials` (
	`id` text PRIMARY KEY DEFAULT '' NOT NULL,
	`name` text NOT NULL,
	`price` text NOT NULL,
	`created_at` integer DEFAULT (current_timestamp),
	`updatedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `materials_price_unique` ON `materials` (`price`);--> statement-breakpoint
CREATE TABLE `records` (
	`id` text PRIMARY KEY DEFAULT '' NOT NULL,
	`weight` text NOT NULL,
	`materialId` text NOT NULL,
	`created_at` integer DEFAULT (current_timestamp),
	`updated_at` integer,
	FOREIGN KEY (`materialId`) REFERENCES `materials`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `records_materialId_unique` ON `records` (`materialId`);