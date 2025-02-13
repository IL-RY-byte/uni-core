export default {
    async fetch(request: Request, env: any): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname === "/schedule") {
            return handleGetSchedule(request, env);
        }

        return new Response("Not found", { status: 404 });
    }
};

async function handleGetSchedule(request: Request, env: any): Promise<Response> {
    const email = new URL(request.url).searchParams.get("email");

    if (!email) {
        return new Response("Missing email parameter", { status: 400 });
    }

    try {
        const schedule = await getUserSchedule(email, env);
        return new Response(JSON.stringify(schedule), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(`Error fetching schedule: ${error}`, { status: 500 });
    }
}

async function getAccessToken(env: any): Promise<string> {
    const tokenUrl = `https://login.microsoftonline.com/${env.TENANT_ID}/oauth2/v2.0/token`;
    const params = new URLSearchParams();
    params.append("client_id", env.CLIENT_ID);
    params.append("client_secret", env.CLIENT_SECRET);
    params.append("grant_type", "client_credentials");
    params.append("scope", "https://graph.microsoft.com/.default");

    const response = await fetch(tokenUrl, {
        method: "POST",
        body: params,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }

    const data: unknown = await response.json();
    if (typeof data === "object" && data !== null && "access_token" in data) {
        return (data as { access_token: string }).access_token;
    } else {
        throw new Error("Invalid response format: missing access_token");
    }
}

async function getUserSchedule(email: string, env: any): Promise<any> {
    const token = await getAccessToken(env);
    const url = `${env.GRAPH_API_URL}/users/${email}/calendar/events`;

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch schedule: ${response.statusText}`);
    }

    const data: unknown = await response.json();
    if (typeof data === "object" && data !== null) {
        return data;
    } else {
        throw new Error("Invalid response format");
    }
}
