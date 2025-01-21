import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const createAxios = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export const responseError = (error: Error) => {
  let errorMessage = "An unexpected error occurred";

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      errorMessage = "Network error - please check your connection";
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out - please try again";
    } else if (error.response?.status === 401) {
      errorMessage = "Unauthorized - please login again";
    } else if (error.response?.status === 403) {
      errorMessage = "Access denied";
    } else if (error.response?.status === 404) {
      errorMessage = "Resource not found";
    } else if (error.response?.status >= 500) {
      errorMessage = "Server error - please try again later";
    } else {
      errorMessage = error.response?.data?.message || error.message;
    }

    return errorMessage;
  }
};

export const createAPIInstance = (
  onResponseError?: (arg0: Error) => unknown
) => {
  const instance = createAxios();

  instance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response: AxiosResponse) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      let errorMessage = responseError(error);

      if (onResponseError) {
        onResponseError(new Error(errorMessage));
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = createAxios();

// Authorization: `Bearer ${param?.token || ""}`,
// "X-tenant-id": `${param?.tenantId || 0}`,
