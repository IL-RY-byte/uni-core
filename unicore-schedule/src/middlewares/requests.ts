import { getUserSchedule } from "functions/microsoft";
import { getUserGrades } from "functions/microsoft";


export async function handleGetSchedule(request: Request, env: any): Promise<Response> {
    const email = new URL(request.url).searchParams.get("email");

    if (!email) {
        return new Response("Missing email parameter", { status: 400 });
    }


    const schedule = await getUserSchedule(env);
    console.log(schedule);
    return schedule;
}

export async function handleGetGrades(request: Request, env: any): Promise<Response> {

    const grades = await getUserGrades(env);
    console.log(grades);
    return grades;
}
