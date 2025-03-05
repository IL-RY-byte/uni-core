import { createRouter } from "@lib/create-app";
import { SessionContext } from "@lib/types";
import { jwtMiddleware } from "middlewares/jwtMiddleware";
import requireRoleMiddleware from "middlewares/roleMiddleware";
import sessionMiddleware from "middlewares/sessionMiddleware";
import { getDB } from "unicore-db";

const router = createRouter()
  .use(jwtMiddleware)
  .use(sessionMiddleware)
  .use(requireRoleMiddleware(["ADMIN"]));

router.get("/", async (c: SessionContext) => {
  const db = getDB(c.env);
  const userSession = c.get("userSession");

  const user = await db.query.user.findFirst({
    where(fields, operators) {
      return operators.eq(fields.idUser, Number(userSession.userId));
    },
  });

  return c.json({
    message: `Congrats Mr. ${user?.surname}! You are authentificated!`,
    session: userSession,
  });
});

export const exampleProtected = router;
