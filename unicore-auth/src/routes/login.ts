import { createRouter } from "../lib/create-app";
import { createRoute } from "@hono/zod-openapi";
import {
  generateSessionId,
  signString,
  verifyPassword,
} from "@lib/cryptography";
import { getUserWithRoles } from "@lib/db-utils";
import {
  LoginResponseSchema,
  LoginBodySchema,
  ErrorResponseSchema,
} from "@lib/schemas"; // Import schemas
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
          schema: LoginResponseSchema,
        },
      },
      description:
        "Successfully authenticated. Returns a signed session token in JSON and sets it as an HTTP-only cookie.",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Invalid credentials (wrong login or password).",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Internal server error.",
    },
  },
  description:
    "Authenticates a user and returns a signed session token. The token is also stored as an HTTP-only cookie.",
});

async function handler(c: AppContext) {
  try {
    const { login, password } = await c.req.json();

    const db = getDB(c.env);
    const user = await getUserWithRoles(db, login);

    if (!user) {
      return c.json({ message: "Invalid credentials." }, 401);
    }

    if (!verifyPassword(password, user.passwordHash, user.passwordSalt)) {
      return c.json({ message: "Invalid credentials." }, 401);
    }

    // Generate session
    const sessionId = generateSessionId();
    await storeSession(c.env.KV, sessionId, {
      userId: user.idUser,
      roles: user.roles,
    });

    // Sign session and set token
    const signature = await signString(
      sessionId,
      c.env.ACCESS_TOKEN_SECRET,
      "SHA-256"
    );
    const token = `${sessionId}.${signature}`;

    // Set HTTP-only cookie with the token
    setCookie(c, "token", token, { httpOnly: true, secure: true });

    return c.json({ token }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Internal server error." }, 500);
  }
}

const loginRouter = createRouter().openapi(rout, handler);

export default loginRouter;
