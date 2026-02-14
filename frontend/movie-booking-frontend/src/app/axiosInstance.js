import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

/* REQUEST INTERCEPTOR */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* RESPONSE INTERCEPTOR */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      "Server error occurred";

    if (status === 401 || status === 403) {
      window.location.href = "/access-denied";
    } else {
      window.location.href = `/error?status=${status}&message=${encodeURIComponent(
        message
      )}`;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
