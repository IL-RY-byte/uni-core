import { verifySignedString } from "@lib/cryptography";
import { getSession } from "@lib/session-utils";
import { Next } from "hono/types";
import { getCookie } from "hono/cookie";
import { AppContext, SessionContext } from "@lib/types";

export default async function sessionMiddleware(c: AppContext, next: Next) {
  const token = getCookie(c, "token");

  const ACCESS_TOKEN_SECRET = c.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    return c.json(
      {
        message: "Unauthorized: No token provided",
      },
      401
    );
  }

  const [sessionId, signature] = token.split(".");

  if (
    !(await verifySignedString(
      sessionId,
      signature,
      ACCESS_TOKEN_SECRET,
      "SHA-256"
    ))
  ) {
    return c.json(
      { message: `Invalid session id. ${sessionId} , ${signature}` },
      401
    );
  }

  const userSession = await getSession(c.env.KV, sessionId);
  if (!userSession) return c.json({ message: "Session expired." }, 401);

  (c as SessionContext).set("userSession", userSession);
  // console.log("Session fired!");
  await next();
}
