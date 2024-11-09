PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_materials_records` (
	`id` text PRIMARY KEY DEFAULT '' NOT NULL,
	`materialId` text DEFAULT '' NOT NULL,
	`recordId` text DEFAULT '' NOT NULL,
	`materialPrice` text NOT NULL,
	`recordWeight` text NOT NULL,
	`created_at` integer DEFAULT (current_timestamp),
	`updated_at` integer,
	FOREIGN KEY (`materialId`) REFERENCES `materials`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recordId`) REFERENCES `records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_materials_records`("id", "materialId", "recordId", "materialPrice", "recordWeight", "created_at", "updated_at") SELECT "id", "materialId", "recordId", "materialPrice", "recordWeight", "created_at", "updated_at" FROM `materials_records`;--> statement-breakpoint
DROP TABLE `materials_records`;--> statement-breakpoint
ALTER TABLE `__new_materials_records` RENAME TO `materials_records`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `materials_price_unique` ON `materials` (`price`);