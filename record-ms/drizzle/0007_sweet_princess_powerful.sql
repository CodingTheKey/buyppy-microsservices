PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_records` (
	`id` text PRIMARY KEY DEFAULT '' NOT NULL,
	`weight` text NOT NULL,
	`created_at` integer DEFAULT (current_timestamp),
	`updated_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_records`("id", "weight", "created_at", "updated_at") SELECT "id", "weight", "created_at", "updated_at" FROM `records`;--> statement-breakpoint
DROP TABLE `records`;--> statement-breakpoint
ALTER TABLE `__new_records` RENAME TO `records`;--> statement-breakpoint
PRAGMA foreign_keys=ON;