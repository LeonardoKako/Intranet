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
  createdAt: Date;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  nickname: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};
