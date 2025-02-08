import { createRouter } from "../lib/create-app";
import { createRoute } from "@hono/zod-openapi";
import { hashPassword } from "@lib/cryptography";
import {
  CreateUserBodySchema,
  CreateUserResponseSchema,
  ErrorResponseSchema,
} from "@lib/schemas";
import { AppContext } from "@lib/types";
import { getDB } from "unicore-db";
import { user, profileInfo, userRole } from "unicore-db/src/schema";

const rout = createRoute({
  path: "/create_user",
  method: "post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateUserBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CreateUserResponseSchema,
        },
      },
      description:
        "User created successfully. Returns user details with profile info and roles.",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Invalid role title provided.",
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
    "Creates a new user with an associated profile info entry and assigned roles.",
});

async function handler(c: AppContext) {
  try {
    const {
      login,
      password,
      name,
      surname,
      profileInfo: profileData,
      roles: roleTitles,
    } = await c.req.json();
    const db = getDB(c.env);

    if (roleTitles && roleTitles.length > 0) {
      const existingRoles = await db.query.role.findMany({
        where(fields, operators) {
          return operators.or(
            ...roleTitles.map((title: string) =>
              operators.eq(fields.title, title)
            )
          );
        },
      });
      const existingRoleTitles = existingRoles.map((r) => r.title);
      const missingRoles = roleTitles.filter(
        (title: string) => !existingRoleTitles.includes(title)
      );
      if (missingRoles.length > 0) {
        return c.json(
          { message: `Invalid role(s): ${missingRoles.join(", ")}` },
          400
        );
      }
    }

    const { hash: passwordHash, salt: passwordSalt } = await hashPassword(
      password
    );

    const profileResult = await db
      .insert(profileInfo)
      .values({
        phoneNumber: profileData?.phoneNumber || null,
        email: profileData?.email || null,
        faculty: profileData?.faculty || null,
        program: profileData?.program || null,
        groupa: profileData?.groupa || null,
        admissionYear: profileData?.admissionYear || null,
      })
      .returning();
    const profileInfoObject = profileResult[0];

    const userResult = await db
      .insert(user)
      .values({
        name,
        surname,
        passwordHash,
        passwordSalt,
        login,
        idProfileInfo: profileInfoObject.idProfileInfo,
      })
      .returning({
        idUser: user.idUser,
        login: user.login,
        name: user.name,
        surname: user.surname,
      });
    const insertedUser = userResult[0];
    const userId = insertedUser.idUser;

    let assignedRoles: string[] = [];
    if (roleTitles && roleTitles.length > 0) {
      const existingRoles = await db.query.role.findMany({
        where(fields, operators) {
          return operators.or(
            ...roleTitles.map((title: string) =>
              operators.eq(fields.title, title)
            )
          );
        },
      });
      const userRolesData = existingRoles.map((r) => ({
        idUser: userId,
        idRole: r.idRole,
      }));
      await db.insert(userRole).values(userRolesData);
      assignedRoles = existingRoles.map((r) => r.title);
    }

    return c.json(
      {
        ...insertedUser,
        profileInfo: profileInfoObject,
        roles: assignedRoles,
      },
      200
    );
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error.";
    const statusCode = errorMessage.includes("Invalid role") ? 400 : 500;
    return c.json({ message: errorMessage }, statusCode);
  }
}

const createUserRouter = createRouter().openapi(rout, handler);

export default createUserRouter;
