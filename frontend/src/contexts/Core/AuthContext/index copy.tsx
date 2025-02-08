import React from "react";
import { api } from "@/api.service";
import { useError } from "../ErrorContext";
import { InternalAxiosRequestConfig } from "axios";

export type UserData = {
  userId: number | string | null;
  tenantId: number | string | null;
};

type LoginPayload = {
  authorize: string;
  password: string;
};

export interface AuthContext {
  token?: string | null;
  refreshToken?: string | null;
  user: UserData | null;
  loginHandler: (payload: LoginPayload) => void;
}

type AppProviderProps = {
  children: React.ReactNode;
};

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used withing a AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: AppProviderProps) => {
  const { showError } = useError();
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserData | null>(null);
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);

  const resetAuthStates = React.useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  const updateAuthStates = React.useCallback((data: any) => {
    setToken(data?.accessToken);
    setRefreshToken(data?.refreshToken);
    setUser(data?.user);
  }, []);

  const loginHandler = React.useCallback(async (payload: LoginPayload) => {
    try {
      const response = await api.post("/auth/login", payload);
      const { data } = response;

      if (response?.status !== 200) {
        resetAuthStates();
        return;
      }

      updateAuthStates(data?.result);
    } catch (error: any) {
      resetAuthStates();
      showError(error);
    }
  }, []);

  React.useLayoutEffect(() => {
    const authInterceptors = api.interceptors.request.use(
      (config: CustomRequestConfig) => {
        const authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;

        config.headers.Authorization = authorization;

        return config;
      }
    );

    return () => {
      api.interceptors.request.eject(authInterceptors);
    };
  }, [token]);

  React.useLayoutEffect(() => {
    const refreshInterceptors = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("asas", error);
        const originalRequest = error.config;

        if (error?.response?.status === 401) {
          try {
            const response = await api.post("/auth/refresh-token", {
              refreshToken,
            });

            updateAuthStates(response.data?.result);

            originalRequest.headers.Authorization = `Bearer ${response.data?.result?.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch (error) {
            resetAuthStates();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptors);
    };
  }, [token, refreshToken, resetAuthStates]);

  const values = { token, refreshToken, user, loginHandler };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
