import { eq, UnicoreDB } from "unicore-db";
import { role, user, userRole } from "unicore-db/src/schema";

/**
 * Retrieves user info along with assigned roles based on login.
 * @param login - The user's login
 * @returns User object with roles or null if not found.
 */
export async function getUserWithRoles(db: UnicoreDB, login: string) {
  const userWithRoles = await db
    .select({
      idUser: user.idUser,
      name: user.name,
      surname: user.surname,
      login: user.login,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      roles: role.title, // Get role titles
    })
    .from(user)
    .leftJoin(userRole, eq(user.idUser, userRole.idUser))
    .leftJoin(role, eq(userRole.idRole, role.idRole))
    .where(eq(user.login, login));

  if (userWithRoles.length === 0) {
    return null; // User not found
  }

  // Group user roles into an array
  return {
    idUser: userWithRoles[0].idUser,
    name: userWithRoles[0].name,
    surname: userWithRoles[0].surname,
    login: userWithRoles[0].login,
    passwordHash: userWithRoles[0].passwordHash,
    passwordSalt: userWithRoles[0].passwordSalt,
    roles: userWithRoles.map((row) => row.roles).filter(Boolean), // Collect non-null roles
  };
}
