import { createRouter } from "../lib/create-app";
import { createRoute } from "@hono/zod-openapi";
import { hashPassword } from "@lib/cryptography";
import { CreateUserBodySchema } from "@lib/schemas";
import { AppContext } from "types";
import { getDB } from "unicore-db";
import { user } from "unicore-db/src/schema";

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
      description: "Returns JSON with name, surname, login and id.",
    },
  },
});

async function handler(c: AppContext) {
  const { login, password, name, surname } = await c.req.json();

  const { hash: passwordHash, salt: passwordSalt } = await hashPassword(
    password
  );

  const db = getDB(c.env);
  const inserted = await db
    .insert(user)
    .values({ name, surname, passwordHash, passwordSalt, login })
    .returning({
      idUser: user.idUser,
      login: user.login,
      name: user.name,
      surname: user.surname,
    });

  return c.json(inserted, 200);
}

const createUserRouter = createRouter().openapi(rout, handler);

export default createUserRouter;
