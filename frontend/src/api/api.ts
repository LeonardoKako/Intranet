import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // URL base
  timeout: 10000, // evita requisições travadas
});

// Interceptor para adicionar token futuramente (opcional)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
