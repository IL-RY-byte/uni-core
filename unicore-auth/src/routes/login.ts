import { createRouter } from "../lib/create-app";
import { createRoute } from "@hono/zod-openapi";
import { generateSessionId, verifyPassword } from "@lib/cryptography";
import { getUserWithRoles } from "@lib/db-utils";
import {
  LoginResponseSchema,
  LoginBodySchema,
  ErrorResponseSchema,
} from "@lib/schemas";
import { storeSession } from "@lib/session-utils";
import { AppContext, AppOpenAPI } from "@lib/types";
import { getDB } from "unicore-db";
import { sign } from "hono/jwt";
import { cors } from "hono/cors";

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
        "Successfully authenticated. Returns a JWT token in JSON and sets it as an HTTP-only cookie.",
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
    "Authenticates a user and returns a JWT token. The token is also stored as an HTTP-only cookie.",
});

async function postHandler(c: AppContext) {
  // Set CORS headers using the configuration.
  c.header("Access-Control-Allow-Origin", c.env.ALLOWED_ORIGIN);
  c.header("Access-Control-Allow-Credentials", "true");

  try {
    const { login, password } = await c.req.json();

    const db = getDB(c.env);
    const user = await getUserWithRoles(db, login);

    if (!user) {
      return c.json({ message: "Invalid credentials." }, 401);
    }

    if (
      !(await verifyPassword(password, user.passwordHash, user.passwordSalt))
    ) {
      return c.json({ message: "Invalid credentials." }, 401);
    }

    // Generate session
    const sessionId = generateSessionId();
    await storeSession(c.env.KV, sessionId, {
      userId: user.idUser,
      roles: user.roles,
    });

    // Prepare JWT payload with sessionId, userId, roles, issued-at, and expiration.
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sessionId: sessionId,
      userId: user.idUser,
      roles: user.roles,
      iat: now,
      exp: now + 3600, // expires in 1 hour
    };

    // Create the JWT token.
    const token = await sign(payload, c.env.ACCESS_TOKEN_SECRET);

    // Set HTTP-only cookie with the token using the configured cookie domain.
    // setCookie(c, "token", token, {
    //   secure: true,
    //   sameSite: "none",
    // });


    return c.json({ token }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Internal server error." }, 500);
  }
}

const loginRouter = (createRouter()
  .use("/login", async (c, next) => {
    const corsMiddlewareHandler = cors({
      origin: c.env.ALLOWED_ORIGIN,
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type"],
      credentials: true,
    });
    return corsMiddlewareHandler(c, next);
  }) as AppOpenAPI)
  .openapi(rout, postHandler);

export default loginRouter;
