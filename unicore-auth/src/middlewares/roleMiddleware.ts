import { SessionContext } from "@lib/types";
import { Next } from "hono/types";

export default function requireRoleMiddleware(requiredRole: string) {
  return async (c: SessionContext, next: Next) => {
    const user = c.get("userSession");
    if (!user || !user.roles.includes(requiredRole)) {
      return c.json({ error: "Forbidden." }, 403);
    }
    // console.log("Role fired!");
    await next();
  };
}
