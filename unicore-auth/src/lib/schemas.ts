import { z } from "@hono/zod-openapi";

/*
 * Common
 */

export const AuthCookieSchema = z.object({
  token: z.string().describe("Session token stored in cookies."),
});

export const ErrorResponseSchema = z.object({
  message: z.string().describe("Error message."),
});

/*
 * Login
 */

export const LoginBodySchema = z.object({
  login: z.string(),
  password: z.string().min(8),
});

export const LoginResponseSchema = z.object({
  token: z.string().describe("Signed session token."),
});

/*
 * CreateUser
 */

export const ProfileInfoSchema = z.object({
  phoneNumber: z
    .string()
    .nullable()
    .describe("User's phone number.")
    .optional(),
  email: z.string().nullable().describe("User's email.").optional(),
  faculty: z.string().nullable().describe("User's faculty.").optional(),
  program: z.string().nullable().describe("User's program.").optional(),
  groupa: z.string().nullable().describe("User's group.").optional(),
  admissionYear: z
    .number()
    .nullable()
    .describe("Year of admission.")
    .optional(),
});

export const CreateUserBodySchema = z.object({
  login: z.string().email("User login must be in email format."),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]+$/
    )
    .openapi({
      description:
        "Password must contain at least one lowercase, uppercase letter, digit, and special character.",
    }),
  name: z.string().min(2).max(20),
  surname: z.string().min(2).max(20),
  profileInfo: ProfileInfoSchema.optional(), // Profile info is optional
  roles: z
    .array(z.string())
    .optional()
    .describe("List of role titles assigned to the user."),
});

export const CreateUserResponseSchema = z.object({
  login: z.string().describe("User's login."),
  name: z.string().describe("User's first name."),
  surname: z.string().describe("User's surname."),
  profileInfo: ProfileInfoSchema.describe("User's profile information."),
});


/*
* GetUser
*/

export const GetUserResponseSchema = z.object({
  idUser: z.number().describe("Unique identifier for the user."),
  login: z.string().describe("User's login."),
  name: z.string().describe("User's first name."),
  surname: z.string().describe("User's surname."),
  profileInfo: ProfileInfoSchema.nullable().describe("User's profile information. Returns null if not set."),
  roles: z.array(z.string()).describe("List of role titles assigned to the user."),
});