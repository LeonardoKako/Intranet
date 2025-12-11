// api/categoryService.ts
import { api } from "./api";
import type { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";

export const categoryService = {
  getAll: async () => {
    const response = await api.get("/category");
    return response.data;
  },

  create: async (data: CreateCategoryDto) => {
    const response = await api.post("/category", data);
    return response.data;
  },

  update: async (id: string, data: UpdateCategoryDto) => {
    const response = await api.patch(`/category/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  },
};
