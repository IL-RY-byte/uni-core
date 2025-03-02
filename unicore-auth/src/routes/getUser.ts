import { createRouter } from "../lib/create-app";
import { createRoute } from "@hono/zod-openapi";
import { ErrorResponseSchema } from "@lib/schemas";
import { GetUserResponseSchema } from "@lib/schemas";
import {
  AppContext,
  AppOpenAPI,
  SessionContext,
  UserSession,
} from "@lib/types";
import { getDB } from "unicore-db";
import requireRoleMiddleware from "../middlewares/roleMiddleware";
import sessionMiddleware from "middlewares/sessionMiddleware";

const rout = createRoute({
  path: "/get_user",
  method: "get",
  parameters: [
    {
      name: "idUser",
      in: "query",
      required: false,
      schema: {
        type: "integer",
        description:
          "The ID of the user to retrieve. If not provided, returns the current user's info from the token.",
        example: 1234,
      },
    },
  ],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetUserResponseSchema,
        },
      },
      description: "User details with profile info and roles.",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description:
        "Bad request. The 'idUser' query parameter is invalid.",
    },
    403: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Forbidden. You do not have access to this resource.",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "User not found.",
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
    "Retrieves user details along with profile info and roles by user ID. If no idUser is provided, returns the info of the currently authenticated user.",
});


async function handler(c: AppContext) {
  try {
    const idUserQuery = c.req.query("idUser");
    let requestedUserId: number;

    if (!idUserQuery) {
      // If no query parameter, extract the userId from the token's session.
      const session = (c as SessionContext).get("userSession") as UserSession;
      requestedUserId = Number(session.userId);
    } else {
      requestedUserId = Number(idUserQuery);
      if (isNaN(requestedUserId)) {
        return c.json(
          { message: "Bad request: Invalid idUser parameter" },
          400
        );
      }
    }

    const db = getDB(c.env);

    // Retrieve the user record from the database.
    const userRecord = await db.query.user.findFirst({
      where(fields, operators) {
        return operators.eq(fields.idUser, requestedUserId);
      },
    });
    if (!userRecord) {
      return c.json({ message: "User not found." }, 404);
    }

    // Initialize profileInfo to null.
    let profileInfo = null;
    if (userRecord.idProfileInfo != null) {
      // Retrieve the associated profile info.
      const profileInfoRecord = await db.query.profileInfo.findFirst({
        where(fields, operators) {
          return operators.eq(fields.idProfileInfo, userRecord.idProfileInfo!);
        },
      });
      if (profileInfoRecord) {
        // Transform the record to only include the fields defined in ProfileInfoSchema.
        profileInfo = {
          phoneNumber: profileInfoRecord.phoneNumber,
          email: profileInfoRecord.email,
          faculty: profileInfoRecord.faculty,
          program: profileInfoRecord.program,
          groupa: profileInfoRecord.groupa,
          admissionYear: profileInfoRecord.admissionYear,
        };
      }
    }

    // Retrieve roles via the join table (UserRole).
    const userRolesMappings = await db.query.userRole.findMany({
      where(fields, operators) {
        return operators.eq(fields.idUser, userRecord.idUser);
      },
    });

    let rolesArray: string[] = [];
    if (userRolesMappings.length > 0) {
      const roleIds = userRolesMappings.map((ur) => ur.idRole);
      // Use an equivalent OR condition instead of operators.in.
      const rolesRecords = await db.query.role.findMany({
        where(fields, operators) {
          return operators.or(
            ...roleIds.map((id: number) => operators.eq(fields.idRole, id))
          );
        },
      });
      rolesArray = rolesRecords.map((r) => r.title);
    }

    return c.json(
      {
        idUser: userRecord.idUser,
        login: userRecord.login,
        name: userRecord.name,
        surname: userRecord.surname,
        profileInfo,
        roles: rolesArray,
      },
      200
    );
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error.";
    return c.json({ message: errorMessage }, 500);
  }
}

// Extra check function: if the user is a STUDENT, they can only access their own profile.
const checkStudentOwnProfile = (user: UserSession, c: SessionContext) => {
  if (user.roles.includes("STUDENT") && user.roles.length == 1) {
    const idUserQuery = c.req.query("idUser");
    if (!idUserQuery) {
      // No query parameter: they are accessing their own profile.
      return true;
    }
    return Number(idUserQuery) === Number(user.userId);
  }
  return true;
};

const getUserRouter = (
  createRouter()
    .use(sessionMiddleware)
    .use(
      requireRoleMiddleware(
        ["TEACHER", "ADMIN", "STUDENT"],
        checkStudentOwnProfile
      )
    ) as AppOpenAPI
).openapi(rout, handler);

export default getUserRouter;
