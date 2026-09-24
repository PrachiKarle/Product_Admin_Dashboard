//AxiosConfiguration

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle API errors in one place
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(
        "API Error:",
        error.response.data?.message || "Something went wrong"
      );
    } else if (error.request) {
      console.log("Network Error: No response from server");
    } else {
      console.log("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;