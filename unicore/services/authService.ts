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
  const response = await fetch(
    (process.env as unknown as Env).NEXT_PUBLIC_API_URL + "/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Send cookies along with the request.
      body: JSON.stringify(body),
    }
  );

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

/**
 *
 *
 * /get_user/[id]
 *
 *
 */

/**
 * Represents the user's profile information.
 */
export interface ProfileInfo {
  phoneNumber: string | null;
  email: string | null;
  faculty: string | null;
  program: string | null;
  groupa: string | null;
  admissionYear: number | null;
}

/**
 * Represents a successful response from the get_user endpoint.
 */
export interface GetUserResponse {
  idUser: number;
  login: string;
  name: string;
  surname: string;
  profileInfo: ProfileInfo | null;
  roles: string[];
}

/**
 * Represents an error response from the get_user endpoint.
 */
export interface ErrorResponse {
  message: string;
}

/**
 * Fetches user data.
 * If idUser is provided, it will fetch that specific user's info.
 * Otherwise, it calls the endpoint without the query parameter to return
 * the current user's info (decoded from the HTTP-only JWT token).
 */
export const getUser = async (idUser?: number): Promise<GetUserResponse> => {
  let url = (process.env as unknown as Env).NEXT_PUBLIC_API_URL + "/get_user";
  if (typeof idUser !== "undefined") {
    url += `?idUser=${idUser}`;
  }
  const response = await fetch(url, {
    credentials: "include",
  });

  if (!response.ok) {
    // Parse the error response for a descriptive message.
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.message || "Failed to fetch user");
  }

  const userData: GetUserResponse = await response.json();
  return userData;
};

/**
 * Calls the /logout endpoint to clear the user's session.
 */
export async function logout(): Promise<void> {
  const response = await fetch(
    (process.env as unknown as Env).NEXT_PUBLIC_API_URL + "/logout",
    {
      method: "POST",
      credentials: "include", // Include cookies
    }
  );

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.message || "Failed to logout");
  }
}
