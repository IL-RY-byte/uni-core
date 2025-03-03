import { getSession } from "@lib/session-utils";
import { Next } from "hono/types";
import { AppContext, SessionContext } from "@lib/types";

export default async function sessionMiddleware(c: AppContext, next: Next) {
  const payload = c.get("jwtPayload");
  if (!payload.sessionId)
    return c.json({ message: "Unauthorized: Invalid token payload" }, 401);

  const userSession = await getSession(c.env.KV, payload.sessionId);
  if (!userSession) {
    return c.json({ message: "Session expired or invalid" }, 401);
  }

  (c as SessionContext).set("userSession", userSession);
  await next();
}
