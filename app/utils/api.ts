import axios from "axios";

// Client-side Axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (res.data?.token) {
          const newAccessToken = res.data.token;
          localStorage.setItem("token", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
        throw new Error("No token received from refresh");
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Server-side Axios instance
export const createServerApi = (
  accessToken: string | undefined,
  refreshToken: string | undefined
) => {
  const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  serverApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            { refreshToken },
            {
              headers: { "x-internal-call": true },
            }
          );

          if (res.data?.token) {
            const newAccessToken = res.data.token;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            const response = await serverApi(originalRequest);
            return response;
          }
          throw new Error("No token received from refresh");
        } catch (refreshError) {
          console.error("Server token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return serverApi;
};
