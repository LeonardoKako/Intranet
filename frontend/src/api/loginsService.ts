import { api } from "./api";
import type { CreateLoginDto, UpdateLoginDto } from "./dto/login.dto";

export const loginService = {
  getAll: async () => {
    const response = await api.get("/logins");
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/logins/${id}`);
    return response.data;
  },

  create: async (data: CreateLoginDto) => {
    const response = await api.post("/logins", data);
    return response.data;
  },

  update: async (id: string, data: UpdateLoginDto) => {
    const response = await api.patch(`/logins/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/logins/${id}`);
    return response.data;
  },
};
