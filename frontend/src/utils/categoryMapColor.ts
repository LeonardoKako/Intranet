export type CategoryColor =
  | "orange"
  | "blue"
  | "teal"
  | "red"
  | "green"
  | "purple"
  | "pink"
  | "yellow";

export const CATEGORY_COLOR_MAP: Record<string, CategoryColor> = {
  // nome da categoria vindo do banco → cor fixa
  Login: "blue",
  Usuários: "purple",
  Servidores: "green",
  Cloud: "orange",
  Rede: "red",
  Segurança: "teal",
  Documentação: "yellow",

  // fallback handled no componente
};

export const SIDEBAR_COLOR_CLASSES: Record<CategoryColor, string> = {
  orange: "hover:bg-orange-400 hover:text-white",
  blue: "hover:bg-blue-400 hover:text-white",
  teal: "hover:bg-teal-400 hover:text-white",
  red: "hover:bg-red-400 hover:text-white",
  green: "hover:bg-green-400 hover:text-white",
  purple: "hover:bg-purple-400 hover:text-white",
  pink: "hover:bg-pink-400 hover:text-white",
  yellow: "hover:bg-yellow-400 hover:text-white",
};
