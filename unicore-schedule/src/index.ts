import { handleGetSchedule } from "middlewares/requests";
import { handleGetGrades } from "middlewares/requests";

export default {
    async fetch(request: Request, env: any): Promise<Response> {
        const url = new URL(request.url);

        switch (url.pathname) {
            case "/schedule":
                return handleGetSchedule(request, env);
            case "/subjects":
                return handleGetGrades(request, env);
            default:
                return new Response("Not found", { status: 404 });
        }
    }
};
