import { z } from "@hono/zod-openapi";

export const LoginBodySchema = z.object({
  login: z.string(),
  password: z.string(),
  // .min(8)
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   "Must contain at least one lowercase letter. Must contain at least one uppercase letter. Must contain at least one digit. Must contain at least one special character."
  // ),
});

export const AccessJwtPayload = z.object({
  login: z.string(),
  role: z.enum(["admin", "student", "proffesor"]),
  exp: z.string().openapi({ description: "Expiary unix timestamp." }),
});
