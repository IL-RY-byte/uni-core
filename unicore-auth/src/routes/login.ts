import { createRouter } from "../lib/create-app";
import { createRoute } from "@hono/zod-openapi";
import {
  generateSessionId,
  signString,
  verifyPassword,
} from "@lib/cryptography";
import { getUserWithRoles } from "@lib/db-utils";
import { LoginResponse, LoginBodySchema } from "@lib/schemas";
import { storeSession } from "@lib/session-utils";
import { setCookie } from "hono/cookie";
import { AppContext } from "@lib/types";
import { getDB } from "unicore-db";

const rout = createRoute({
  path: "/login",
  method: "post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LoginResponse,
        },
      },
      description: "JWT payload.",
    },
    401: { description: "Invalid credentials." },
  },
  description:
    "In response, it will send header to store JWT token securely in cookies (name: 'token').",
});

async function handler(c: AppContext) {
  const { login, password } = await c.req.json();

  const db = getDB(c.env);
  const user = await getUserWithRoles(db, login);

  if (!user) return c.json({ message: "Invalid credentials." }, 401);
  else if (!verifyPassword(password, user.passwordHash, user.passwordSalt))
    return c.json({ message: "Invalid credentials. Wrong password." }, 401);

  const sessionId = generateSessionId();
  await storeSession(c.env.KV, sessionId, {
    userId: user.idUser,
    roles: user.roles,
  });

  const signature = await signString(
    sessionId,
    c.env.ACCESS_TOKEN_SECRET,
    "SHA-256"
  );
  const token = `${sessionId}.${signature}`;

  setCookie(c, "token", token, { httpOnly: true, secure: true });

  return c.json({ token }, 200);
}

const loginRouter = createRouter().openapi(rout, handler);

export default loginRouter;
