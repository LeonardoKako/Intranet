export type CreateLoginDto = {
  title: string;
  username: string;
  url: string;
  password: string;
  categoryId: string;
};

export type UpdateLoginDto = Partial<Omit<CreateLoginDto, "categoryId">>;
