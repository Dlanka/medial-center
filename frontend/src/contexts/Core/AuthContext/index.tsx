import { api } from "@/api.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useError } from "../ErrorContext";

type UserData = {
  email: string | null;
  userId: number | string | null;
  tenantId: number | string | null;
};

type LoginPayload = {
  authorize: string;
  password: string;
};

type AuthState = {
  token?: string | null;
  refreshToken?: string | null;
  user: UserData | null;
  loginHandler: (payload: LoginPayload) => void;
};

const AuthContext = React.createContext<AuthState>({
  token: null,
  refreshToken: null,
  user: null,
  loginHandler: () => {},
});

type AppProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AppProviderProps) => {
  const { showError } = useError();
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserData | null>(null);
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);

  // api.get("/auth/");

  const loginHandler = React.useCallback(async (payload: LoginPayload) => {
    try {
      // const response = await api.post("/auth/login", payload);
      showError("Erroorr");
    } catch (error: any) {
      showError(error);
    }
  }, []);

  const values = { token, refreshToken, user, loginHandler };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("Please use auth hook withing the context provider");
  }

  return context;
};
