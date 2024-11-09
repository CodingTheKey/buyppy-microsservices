PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_materials_records` (
	`id` text PRIMARY KEY DEFAULT '' NOT NULL,
	`weight` text NOT NULL,
	`materialId` text NOT NULL,
	`created_at` integer DEFAULT (current_timestamp),
	FOREIGN KEY (`materialId`) REFERENCES `materials`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_materials_records`("id", "weight", "materialId", "created_at") SELECT "id", "weight", "materialId", "created_at" FROM `materials_records`;--> statement-breakpoint
DROP TABLE `materials_records`;--> statement-breakpoint
ALTER TABLE `__new_materials_records` RENAME TO `materials_records`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX IF EXISTS `materials_price_unique`;