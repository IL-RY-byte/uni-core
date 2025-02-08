import { z } from "@hono/zod-openapi";

export const LoginBodySchema = z.object({
  login: z.string(),
  password: z.string().min(8),
});

export const CreateUserBodySchema = z.object({
  login: z.string().email("Invalid email."),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]+$/
    )
    .openapi({
      description:
        "Must contain at least one lowercase letter. Must contain at least one uppercase letter. Must contain at least one digit. Must contain at least one special character.",
    }),
  name: z.string(),
  surname: z.string(),
});

export const userSession = z.object({
  userId: z.string(),
  roles: z.array(z.string()),
});

export const LoginResponse = z.object({
  sessionId: z
    .string()
    .openapi({ description: "JWT token containing session id." }),
});
