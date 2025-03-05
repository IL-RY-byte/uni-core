import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";

export interface AppBindings {
    Bindings: Env;
};

export type UserSession = {
    userId: string;
    roles: string[];
  };

export type AppOpenAPI = OpenAPIHono<AppBindings>;
export type AppContext = Context<AppBindings>;

export interface SessionContext extends AppContext {
    set(key: "userSession", value: UserSession): void;
    get(key: "userSession"): UserSession;
}
