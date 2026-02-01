import axios from "axios";
import { BASE_URL } from "./api";

const axiosInst = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInst.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInst.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      const requestUrl = error.config?.url || "";

      if (status === 401 && !requestUrl.includes("/signin")) {
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }

      if (status === 500) {
        console.error("Server error. Please try again");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Try again");
    }

    return Promise.reject(error);
  },
);

export default axiosInst;
