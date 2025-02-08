import { api } from "@/api.service";
import { useAuth } from "@/contexts/Core/AuthContext";
import { InternalAxiosRequestConfig } from "axios";
import React from "react";

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const useAxios = () => {
  const { token } = useAuth();

  React.useLayoutEffect(() => {
    const requestInterceptors = api.interceptors.request.use(
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
      api.interceptors.request.eject(requestInterceptors);
    };
  }, [token]);

  return <div>useAxios</div>;
};

export default useAxios;
