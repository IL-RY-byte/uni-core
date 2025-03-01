import { verify } from "hono/jwt";
import { getSession } from "@lib/session-utils";
import { Next } from "hono/types";
import { getCookie } from "hono/cookie";
import { AppContext, SessionContext, TokenPayload } from "@lib/types";

export default async function sessionMiddleware(c: AppContext, next: Next) {
  const token = getCookie(c, "token");
  const ACCESS_TOKEN_SECRET = c.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    return c.json({ message: "Unauthorized: No token provided" }, 401);
  }

  let payload: TokenPayload;
  try {
    // Convert the result to unknown before casting to JwtPayload.
    payload = (await verify(
      token,
      ACCESS_TOKEN_SECRET,
      "HS256"
    )) as unknown as TokenPayload;
  } catch (error: unknown) {
    const err = error as Error;
    return c.json({ message: "Unauthorized: " + err.message }, 401);
  }

  if (!payload.sessionId) {
    return c.json({ message: "Unauthorized: Invalid token payload" }, 401);
  }

  const userSession = await getSession(c.env.KV, payload.sessionId);
  if (!userSession) {
    return c.json({ message: "Session expired or invalid" }, 401);
  }

  (c as SessionContext).set("userSession", userSession);
  await next();
}
