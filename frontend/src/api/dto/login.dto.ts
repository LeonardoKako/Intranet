export type CreateLoginDto = {
  title: string;
  username: string;
  description: string;
  url: string;
  password: string;
  categoryId: string;
};

export type UpdateLoginDto = Partial<Omit<CreateLoginDto, "categoryId">>;
