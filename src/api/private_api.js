import axios from "axios";

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("e-commerce-token");
    if (!token) {
      const err = new Error();
      err.status = 401;
      err.message = "You are not authenticated! Please login first.";
      return Promise.reject(err);
    }

    config.headers.token = token;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

privateApi.interceptors.response.use(
  (res) => res?.data || res,
  (error) => {
    if (error.response) { // request sent but there was an error with the response (401 => Unauthorized, 403 => Forbidden, 404 => Not Found, etc)
      return Promise.reject({
        data: error.response.data,
        message: error.response.data?.message || "Server Error!",
        status: error.response.status,
        statusText: error.response.statusText,
      });
    } else if (error.request) { // request sent but there was no response (network error - no response from server)
      return Promise.reject({
        message: `Network Error: No response received from server: ${error.request}`,
        status: 500,
      });
    } else {
      return Promise.reject({ // recieve the error triggered by me on the request interceptor => [return Promise.reject(error)]
        message: error.message,
        status: error?.status || 500,
      });
    }
  },
);
