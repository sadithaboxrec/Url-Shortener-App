import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "@/api/auth";

import type {
  LoginRequest,
  User,
} from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (request: LoginRequest) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401
      ) {
        setUser(null);
        return;
      }

      console.error(
        "Failed to check authentication:",
        error,
      );

      setUser(null);
    }
  }, []);

  useEffect(() => {
    async function initializeAuthentication() {
      setIsLoading(true);

      try {
        await refreshUser();
      } finally {
        setIsLoading(false);
      }
    }

    void initializeAuthentication();
  }, [refreshUser]);

  const login = useCallback(
    async (request: LoginRequest): Promise<User> => {
      const response = await loginUser(request);

      // The login response already contains the user.
      setUser(response.user);

      return response.user;
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutUser();
    } finally {
      // Clear local state even if the session is already expired.
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
      refreshUser,
    }),
    [
      user,
      isLoading,
      login,
      logout,
      refreshUser,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components -- The hook is the public API of this provider.
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}
