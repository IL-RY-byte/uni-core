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
} from "@lib/schemas";
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

const optionsRout = createRoute({
  path: "/login",
  method: "options",
  responses: {
    200: {
      description: "Preflight CORS text response.",
      headers: {
        "Access-Control-Allow-Origin": {
          schema: { type: "string", example: "Configured via ENV_MODE" },
          description:
            "Allowed origin, set automatically from environment configuration.",
        },
        "Access-Control-Allow-Credentials": {
          schema: { type: "string", example: "true" },
          description: "Indicates that credentials are allowed.",
        },
        "Access-Control-Allow-Methods": {
          schema: { type: "string", example: "GET, POST, OPTIONS" },
          description: "Allowed HTTP methods.",
        },
        "Access-Control-Allow-Headers": {
          schema: { type: "string", example: "Content-Type" },
          description: "Allowed headers.",
        },
      },
    },
  },
  description: "CORS preflight text response for the login endpoint.",
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

    if (!(await verifyPassword(password, user.passwordHash, user.passwordSalt))) {
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

    // Set HTTP-only cookie with the token using the configured cookie domain.
    setCookie(c, "token", token, {
      httpOnly: true,
      secure: true,
      domain: c.env.COOKIE_DOMAIN,
      path: "/"
    });

    return c.json({ token }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Internal server error." }, 500);
  }
}

async function optionsHandler(c: AppContext) {
  // Set CORS headers for OPTIONS requests.
  c.header("Access-Control-Allow-Origin", c.env.ALLOWED_ORIGIN);
  c.header("Access-Control-Allow-Credentials", "true");
  c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");
  return c.text("", { status: 200 });
}

const loginRouter = createRouter()
  .openapi(rout, postHandler)
  .openapi(optionsRout, optionsHandler);

export default loginRouter;
