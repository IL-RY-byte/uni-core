CREATE TABLE `ProfileInfo` (
	`idProfileInfo` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`phoneNumber` text,
	`email` text NOT NULL,
	`faculty` text NOT NULL,
	`program` text NOT NULL,
	`groupa` text,
	`admissionYear` integer NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text,
	`entryStatus` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ProfileInfo_phoneNumber_unique` ON `ProfileInfo` (`phoneNumber`);--> statement-breakpoint
CREATE UNIQUE INDEX `ProfileInfo_email_unique` ON `ProfileInfo` (`email`);--> statement-breakpoint
CREATE TABLE `Role` (
	`idRole` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text,
	`entryStatus` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Role_title_unique` ON `Role` (`title`);--> statement-breakpoint
CREATE TABLE `User` (
	`idUser` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`login` text NOT NULL,
	`passwordHash` text NOT NULL,
	`passwordSalt` text NOT NULL,
	`idProfileInfo` integer,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text,
	`entryStatus` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`idProfileInfo`) REFERENCES `ProfileInfo`(`idProfileInfo`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `User_login_unique` ON `User` (`login`);--> statement-breakpoint
CREATE TABLE `UserRole` (
	`idUserRole` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`idRole` integer NOT NULL,
	`idUser` integer NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text,
	`entryStatus` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`idRole`) REFERENCES `Role`(`idRole`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON UPDATE no action ON DELETE no action
);
