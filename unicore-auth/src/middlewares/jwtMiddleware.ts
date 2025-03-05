import { AppContext } from "@lib/types";
import { jwt } from "hono/jwt";
import { Next } from "hono/types";

export function jwtMiddleware(c: AppContext, next: Next) {
  return jwt({ secret: c.env.ACCESS_TOKEN_SECRET })(c, next);
}
