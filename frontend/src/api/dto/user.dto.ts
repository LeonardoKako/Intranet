export type CreateUserDto = {
  fullName: string;
  email: string;
  nickname: string;
  password: string;
};

export type UpdateUserDto = Partial<CreateUserDto>;
