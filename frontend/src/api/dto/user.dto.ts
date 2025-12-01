export type CreateUserDto = {
  fullName: string;
  email: string;
  nickname: string;
  passwordHash: string;
};

export type UpdateUserDto = Partial<CreateUserDto>;
