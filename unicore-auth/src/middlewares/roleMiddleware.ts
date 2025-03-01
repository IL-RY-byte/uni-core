import { Next } from "hono/types";
import { SessionContext, UserSession } from "@lib/types";

export default function requireRoleMiddleware(
  allowedRoles: string[],
  check?: (user: UserSession, c: SessionContext) => boolean | Promise<boolean>
) {
  return async (c: SessionContext, next: Next) => {
    const user = c.get("userSession");
    if (!user) {
      return c.json({ error: "Unauthorized." }, 401);
    }

    // Verify the user has at least one of the allowed roles.
    const hasAllowedRole = allowedRoles.some((role) => user.roles.includes(role));
    if (!hasAllowedRole) {
      return c.json({ error: "Forbidden: Insufficient role." }, 403);
    }

    // Execute the additional check if provided.
    if (check) {
      const checkPassed = await check(user, c);
      if (!checkPassed) {
        return c.json({ error: "Forbidden: Check failed." }, 403);
      }
    }

    await next();
  };
}
