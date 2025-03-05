import { createRouter } from "../lib/create-app";
import { createRoute } from "@hono/zod-openapi";
import { deleteSession } from "@lib/session-utils";
import { deleteCookie, getCookie } from "hono/cookie";
import { AppContext, AppOpenAPI } from "@lib/types";
import { AuthCookieSchema } from "@lib/schemas";
import { cors } from "hono/cors";

const rout = createRoute({
  path: "/logout",
  method: "post",
  parameters: [
    {
      name: "token",
      in: "cookie",
      required: true,
      schema: AuthCookieSchema.shape,
      example: "abcdef123456.signature",
    },
  ],
  responses: {
    200: {
      description: "User logged out successfully.",
    },
    400: {
      description: "User is not logged in.",
    },
    401: {
      description: "Invalid session.",
    },
  },
  description:
    "Clears the user's session and removes the authentication token.",
});

async function handler(c: AppContext) {
  const token = getCookie(c, "token");

  if (!token) {
    return c.json({ success: false, message: "User is not logged in." }, 400);
  }

  const [sessionId] = token.split(".");
  if (!sessionId) {
    return c.json({ success: false, message: "Invalid session." }, 401);
  }

  await deleteSession(c.env.KV, sessionId);

  deleteCookie(c, "token");

  return c.json({ success: true, message: "Logged out successfully." }, 200);
}

const logoutRouter = (createRouter()
  .use(async (c, next) => {
    const corsMiddlewareHandler = cors({
      origin: c.env.ALLOWED_ORIGIN,
      allowMethods: ["POST", "GET", "OPTIONS"],
      allowHeaders: ["Content-Type"],
      credentials: true,
    });
    return corsMiddlewareHandler(c, next);
  }) as AppOpenAPI)
  .openapi(rout, handler);

export default logoutRouter;
