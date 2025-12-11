import type { User } from "../types/types";
import { api } from "./api";
import type { CreateUserDto, UpdateUserDto } from "./dto/user.dto";

export const usersService = {
  async login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // { user: {...}, accessToken: 'xxx' }
  },

  async getOne(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const response = await api.patch(`/users/${id}`, data);
    return response.data; // { id, fullName, email, nickname, status: 'Atualizado' }
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
