import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";

export interface AppBindings {
    Bindings: Env;
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;
export type AppContext = Context<AppBindings>;
