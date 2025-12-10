import type { User } from "../types/types";
import { api } from "./api";
import type { CreateUserDto, UpdateUserDto } from "./dto/user.dto";

export const usersService = {
  async getOne(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  async getAll(): Promise<User[]> {
    const response = await api.get("/users");
    return response.data;
  },

  create: async (data: CreateUserDto) => {
    const response = await api.post("/users", data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
