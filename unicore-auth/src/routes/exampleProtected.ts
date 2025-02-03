import { createRouter } from "@lib/create-app";
import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import { getDB } from "unicore-db";

async function jwtAuthMiddleware(c: Context, next: Next) {
  const token = getCookie(c, "token");

  const ACCESS_TOKEN_SECRET = c.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    throw new HTTPException(401, {
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = await verify(token, ACCESS_TOKEN_SECRET);
    c.set("jwtPayload", decoded);
    await next();
  } catch {
    throw new HTTPException(403, { message: "Forbidden: Invalid token" });
  }
}

export const exampleProtected = createRouter().get(
  "/test_secret",
  jwtAuthMiddleware,
  async (c) => {
    const db = getDB(c.env);
    const userLogin = c.get("jwtPayload").login;

    const user = await db.query.user.findFirst({
      where(fields, operators) {
        return operators.eq(fields.login, userLogin);
      },
    });

    return c.json({
      message: `Congrats Mr. ${user?.surname}! You are authentificated!`,
      payload: c.get("jwtPayload"),
    });
  }
);
