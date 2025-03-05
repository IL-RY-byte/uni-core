CREATE TABLE `Post` (
	`idPost` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`idAuthor` integer NOT NULL,
	`previewImage` text,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text,
	`entryStatus` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`idAuthor`) REFERENCES `User`(`idUser`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PostRolesAllowed` (
	`idPostRolesAllowed` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`idPost` integer NOT NULL,
	`idRole` integer NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text,
	`entryStatus` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`idPost`) REFERENCES `Post`(`idPost`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idRole`) REFERENCES `Role`(`idRole`) ON UPDATE no action ON DELETE no action
);
