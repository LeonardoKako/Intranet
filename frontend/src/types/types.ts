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

export type User = {
  id: string;
  email: string;
  fullName: string;
  nickname: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  // NÃO inclua password ou passwordHash aqui!
};
