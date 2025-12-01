import { api } from "./api";
import type { CreateUserDto, UpdateUserDto } from "./dto/user.dto";

export const usersService = {
  getAll: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  create: async (data: CreateUserDto) => {
    const response = await api.post("/users", data);
    return response.data;
  },

  update: async (id: string, data: UpdateUserDto) => {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
