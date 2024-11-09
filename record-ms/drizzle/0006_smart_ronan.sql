PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_records` (
	`id` text PRIMARY KEY DEFAULT '' NOT NULL,
	`weight` text NOT NULL,
	`recordMaterialId` text NOT NULL,
	`created_at` integer DEFAULT (current_timestamp),
	`updated_at` integer,
	FOREIGN KEY (`recordMaterialId`) REFERENCES `materials`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_records`("id", "weight", "recordMaterialId", "created_at", "updated_at") SELECT "id", "weight", "recordMaterialId", "created_at", "updated_at" FROM `records`;--> statement-breakpoint
DROP TABLE `records`;--> statement-breakpoint
ALTER TABLE `__new_records` RENAME TO `records`;--> statement-breakpoint
PRAGMA foreign_keys=ON;