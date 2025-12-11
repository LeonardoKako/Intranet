export type Login = {
  id: string;
  title: string;
  username: string;
  description: string;
  password: string;
  url: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: Date;
};

// types/types.ts
export type User = {
  id: string; // UUID - string
  fullName: string;
  email: string;
  nickname: string;
  createdAt?: string;
  updatedAt?: string;
  // NUNCA inclua passwordHash aqui!
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};
