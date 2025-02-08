import { OpenAPIHono, z } from "@hono/zod-openapi";
import { Context } from "hono";
import { userSession } from "./schemas";

export interface AppBindings {
    Bindings: Env;
};

export type UserSession = z.infer<typeof userSession>

export type AppOpenAPI = OpenAPIHono<AppBindings>;
export type AppContext = Context<AppBindings>;

export interface SessionContext extends AppContext {
    set(key: "userSession", value: UserSession): void;
    get(key: "userSession"): UserSession;
}
