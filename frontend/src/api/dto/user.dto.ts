export type CreateUserDto = {
  fullName: string;
  email: string;
  nickname: string;
  password: string;
};

export type UpdateUserDto = {
  fullName?: string;
  nickname?: string;
  email?: string;
  oldPassword?: string; // Para verificar antes de alterar a senha
  password?: string; // Nova senha (opcional)
};

export type LoginUserDto = {
  email: string;
  password: string;
};
