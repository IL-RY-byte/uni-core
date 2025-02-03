import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

/**
 * ProfileInfo Table
 *
 * Stores additional user profile details.
 */
export const profileInfo = sqliteTable("ProfileInfo", {
  idProfileInfo: integer("idProfileInfo").primaryKey({ autoIncrement: true }),
  phoneNumber: text("phoneNumber").unique(),
  email: text("email").notNull().unique(),
  faculty: text("faculty").notNull(),
  program: text("program").notNull(),
  groupa: text("groupa"),
  admissionYear: integer("admissionYear").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updatedAt"),
  entryStatus: integer("entryStatus").default(1).notNull(),
});

/**
 * User Table
 *
 * Stores user credentials and references the ProfileInfo table.
 */
export const user = sqliteTable("User", {
  idUser: integer("idUser").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  login: text("login").notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  passwordSalt: text("passwordSalt").notNull(),
  // Foreign key referencing ProfileInfo.
  idProfileInfo: integer("idProfileInfo").references(
    () => profileInfo.idProfileInfo
  ),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updatedAt"),
  entryStatus: integer("entryStatus").default(1).notNull(),
});

/**
 * Role Table
 *
 * Defines user roles.
 */
export const role = sqliteTable("Role", {
  idRole: integer("idRole").primaryKey({ autoIncrement: true }),
  title: text("title").notNull().unique(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updatedAt"),
  entryStatus: integer("entryStatus").default(1).notNull(),
});

/**
 * UserRole Table
 *
 * Implements a many-to-many relationship between User and Role.
 */
export const userRole = sqliteTable("UserRole", {
  idUserRole: integer("idUserRole").primaryKey({ autoIncrement: true }),
  idRole: integer("idRole")
    .notNull()
    .references(() => role.idRole),
  idUser: integer("idUser")
    .notNull()
    .references(() => user.idUser),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updatedAt"),
  entryStatus: integer("entryStatus").default(1).notNull(),
});

/* =====================================================
   Define Relationships Using Drizzle's relations()
   ===================================================== */

/**
 * Relation for User.
 * Each User record has a one-to-one relation with ProfileInfo
 * (via the foreign key field `idProfileInfo`), and may have many UserRole records.
 */
export const userRelations = relations(user, ({ one, many }) => ({
  profileInfo: one(profileInfo, {
    fields: [user.idProfileInfo],
    references: [profileInfo.idProfileInfo],
  }),
  userRoles: many(userRole),
}));

/**
 * Relation for Role.
 * Each Role record may have many UserRole records.
 */
export const roleRelations = relations(role, ({ many }) => ({
  userRoles: many(userRole),
}));

/**
 * Relation for UserRole.
 * Each UserRole record links one User and one Role.
 */
export const userRoleRelations = relations(userRole, ({ one }) => ({
  user: one(user, {
    fields: [userRole.idUser],
    references: [user.idUser],
  }),
  role: one(role, {
    fields: [userRole.idRole],
    references: [role.idRole],
  }),
}));
