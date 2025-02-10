export interface LoginBody {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ErrorResponse {
  message: string;
}

export async function login(body: LoginBody): Promise<LoginResponse> {
  const response = await fetch((process.env as unknown as Env).NEXT_PUBLIC_API_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Send cookies along with the request.
    body: JSON.stringify(body),
  });

  const data: unknown = await response.json();

  if (response.status === 200) {
    if (
      typeof data === "object" &&
      data !== null &&
      "token" in data &&
      typeof (data as any).token === "string"
    ) {
      return data as LoginResponse;
    } else {
      throw new Error("Invalid response format from server");
    }
  } else if (response.status === 401) {
    throw new Error("Invalid email or password");
  } else {
    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as any).message === "string"
    ) {
      throw new Error((data as any).message);
    }
    throw new Error("Something went wrong");
  }
}
