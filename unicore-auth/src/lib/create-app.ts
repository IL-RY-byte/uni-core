import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { AppBindings, AppOpenAPI } from "@lib/types";

export function configureOpenApi(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Unicore Auth API",
    },
  });
}

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            ok: false,
            errors: result.error,
            source: "zod_error_handler",
          },
          422
        );
      }
    },
    strict: false,
  });
}

export function createApp() {
  const app = createRouter();
  app.use(logger());

  app.onError((err, c) => {
    return c.json(
      {
        message: err.message,
        stack: err.stack,
      },
      500
    );
  });

  app.notFound((c) => {
    return c.json(
      {
        message: `Not found - ${c.req.path}`,
      },
      404
    );
  });

  return app;
}
