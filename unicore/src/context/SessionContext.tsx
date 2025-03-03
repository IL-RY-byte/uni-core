import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { GetUserResponse } from "@services/authService";
import { getUser, logout as authLogout } from "@services/authService";
import { getCookie } from "@/lib/cookies";

interface SessionContextType {
  user: GetUserResponse | null;
  loading: boolean;
  refetch: () => void;
  logout: () => Promise<void>;
}

// Set a default value representing "not logged in"
export const SessionContext = createContext<SessionContextType>({
  user: null,
  loading: false,
  refetch: () => {},
  logout: async () => {},
});

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<GetUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refetch = async () => {
    setLoading(true);
    try {
      const token = getCookie("token");
      if (!token) throw Error("No token cookie found.");
      const data = await getUser(token);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      // Redirect to login if user fetching fails.
      router.push("/auth");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      setUser(null);
      router.push("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <SessionContext.Provider value={{ user, loading, refetch, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
