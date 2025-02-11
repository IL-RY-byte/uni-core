PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ProfileInfo` (
	`idProfileInfo` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`phoneNumber` text,
	`email` text,
	`faculty` text,
	`program` text,
	`groupa` text,
	`admissionYear` integer,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text,
	`entryStatus` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_ProfileInfo`("idProfileInfo", "phoneNumber", "email", "faculty", "program", "groupa", "admissionYear", "createdAt", "updatedAt", "entryStatus") SELECT "idProfileInfo", "phoneNumber", "email", "faculty", "program", "groupa", "admissionYear", "createdAt", "updatedAt", "entryStatus" FROM `ProfileInfo`;--> statement-breakpoint
DROP TABLE `ProfileInfo`;--> statement-breakpoint
ALTER TABLE `__new_ProfileInfo` RENAME TO `ProfileInfo`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `ProfileInfo_phoneNumber_unique` ON `ProfileInfo` (`phoneNumber`);--> statement-breakpoint
CREATE UNIQUE INDEX `ProfileInfo_email_unique` ON `ProfileInfo` (`email`);