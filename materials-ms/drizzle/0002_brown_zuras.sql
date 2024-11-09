CREATE TABLE `materials_records` (
	`id` text PRIMARY KEY DEFAULT '' NOT NULL,
	`weight` text NOT NULL,
	`materialId` text NOT NULL,
	`created_at` integer DEFAULT (current_timestamp),
	`updated_at` integer,
	FOREIGN KEY (`materialId`) REFERENCES `materials`(`id`) ON UPDATE no action ON DELETE no action
);
