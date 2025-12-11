// api/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

// Interceptor para adicionar token JWT automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("auth-storage");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
