export type CreateCategoryDto = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
