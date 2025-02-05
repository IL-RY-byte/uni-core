import { createRouter } from "../lib/create-app";
import { createRoute } from "@hono/zod-openapi";
import { verifyPassword } from "@lib/cryptography";
import { AccessJwtPayload, LoginBodySchema } from "@lib/schemas";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { AppContext } from "types";
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
          schema: AccessJwtPayload,
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
  const user = await db.query.user.findFirst({
    where(fields, operators) {
      return operators.eq(fields.login, login);
    },
  });
  if (!user) {
    return c.json({ message: "Invalid credentials. No such user." }, 401);
  }

  if (!verifyPassword(password, user.passwordHash, user.passwordSalt)) {
    return c.json({ message: "Invalid credentials. Wrong password." }, 401);
  }

  const payload = {
    login: login,
    role: "",
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
  };
  const token = await sign(payload, c.env.ACCESS_TOKEN_SECRET);
  setCookie(c, "token", token, { httpOnly: true, secure: true });

  return c.json({ payload }, 200);
}

const loginRouter = createRouter().openapi(rout, handler);

export default loginRouter;
