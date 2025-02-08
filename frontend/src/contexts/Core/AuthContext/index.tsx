import React from "react";
import { api } from "@/api.service";
import { useError } from "../ErrorContext";
import { InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { sleep } from "@/utility";

// Constants
const STORAGE_KEY = {
  REFRESH_TOKEN: "refreshToken",
};

const API_ENDPOINT = {
  LOGIN: "/auth/login",
  REFRESH_TOKEN: "/auth/refresh-token",
};

// Types
export type UserData = {
  userId: number | string;
  tenantId: number | string;
};

export type LoginPayload = {
  authorize: string;
  password: string;
};

export interface AuthContext {
  isAuthenticated: boolean | undefined;
  token: string | null;
  user: UserData | null;
  isRefreshTokenValidating: boolean | undefined;
  loginHandler: (payload: LoginPayload) => Promise<boolean>;
  logoutHandler: () => Promise<any>;
}

type AppProviderProps = {
  children: React.ReactNode;
};

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Context
const AuthContext = React.createContext<AuthContext | null>(null);

const useAuthState = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserData | null | undefined>(
    undefined
  );

  const isAuthenticated = !!user;

  const updateAuthState = React.useCallback(
    (accessToken: string, newRefreshToken: string) => {
      setToken(accessToken);
      setRefreshToken(newRefreshToken);
      const { userId, tenantId }: any = jwtDecode(accessToken);

      setUser({ userId, tenantId });
      localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    },
    []
  );

  const resetAuthState = React.useCallback(() => {
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    setToken(null);
    setRefreshToken(null);
    setUser(undefined);
  }, []);

  return {
    token,
    refreshToken,
    user,
    isAuthenticated,
    updateAuthState,
    resetAuthState,
  };
};

// Hook for using AuthContext
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: AppProviderProps) => {
  const { showError } = useError();
  const [isRefreshTokenValidating, setIsRefreshTokenValidating] =
    React.useState<boolean | undefined>(true);
  const {
    token,
    refreshToken,
    user,
    isAuthenticated,
    updateAuthState,
    resetAuthState,
  } = useAuthState();

  const handleRefreshToken = React.useCallback(async () => {
    try {
      const storedRefreshToken = localStorage.getItem(
        STORAGE_KEY.REFRESH_TOKEN
      );

      if (!storedRefreshToken) {
        throw new Error("No refresh token found in local storage");
      }

      const response = await api.post(API_ENDPOINT.REFRESH_TOKEN, {
        refreshToken: storedRefreshToken,
      });

      updateAuthState(response.data.accessToken, response.data.refreshToken);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      resetAuthState();
    } finally {
      setIsRefreshTokenValidating(false);
    }
  }, []);

  // Initial token refresh
  React.useEffect(() => {
    handleRefreshToken();
  }, []);

  // Save refresh token before unload
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      if (refreshToken) {
        localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refreshToken);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [refreshToken]);

  // Login handler
  const loginHandler = React.useCallback(
    (payload: LoginPayload): Promise<boolean> => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await api.post(API_ENDPOINT.LOGIN, payload);

          if (response.status !== 200) {
            resetAuthState();
            throw new Error("Login failed");
          }

          updateAuthState(
            response.data.result.accessToken,
            response.data.result.refreshToken
          );

          resolve(true);
        } catch (error: any) {
          reject(false);
          resetAuthState();
          showError(error);
        }
      });
    },
    [updateAuthState, resetAuthState, showError]
  );

  // Logout handler
  const logoutHandler = React.useCallback(async (): Promise<boolean> => {
    try {
      const res = await api.post("/auth/logout", { refreshToken });

      if (res.status !== 200) {
        throw new Error("Failed to logout");
      }

      resetAuthState();

      await sleep(10);

      return Promise.resolve(true);
    } catch (error: any) {
      showError(error);
      return Promise.reject(false);
    }
  }, [resetAuthState, refreshToken, showError]);

  console.log("isAuthenticated", user);

  // Auth interceptor
  React.useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config: CustomRequestConfig) => {
        if (!config._retry && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    return () => api.interceptors.request.eject(interceptor);
  }, [token]);

  // Refresh token interceptor
  React.useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          refreshToken
        ) {
          originalRequest._retry = true;
          try {
            const response = await api.post(API_ENDPOINT.REFRESH_TOKEN, {
              refreshToken,
            });
            updateAuthState(
              response.data.result.accessToken,
              response.data.result.refreshToken
            );
            originalRequest.headers.Authorization = `Bearer ${response.data.result.accessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            resetAuthState();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [refreshToken, updateAuthState, resetAuthState]);

  const contextValue: AuthContext = {
    token,
    user: user ?? null,
    isAuthenticated,
    isRefreshTokenValidating,
    loginHandler,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
