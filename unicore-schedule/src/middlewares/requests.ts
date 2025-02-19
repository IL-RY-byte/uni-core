import { getUserSchedule } from "functions/microsoft";
import { getUserGrades } from "functions/microsoft";


export async function handleGetSchedule(request: Request, env: any): Promise<Response> {
    console.log("schedule");

    const schedule = await getUserSchedule(env);
    console.log(schedule);
    return schedule;
}

export async function handleGetGrades(request: Request, env: any): Promise<Response> {

    const grades = await getUserGrades(env);
    console.log(grades);
    return grades;
}
