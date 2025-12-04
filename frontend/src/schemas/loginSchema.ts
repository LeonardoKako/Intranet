import { z } from "zod";

export const loginSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  username: z.string().min(1, "Usuário é obrigatório"),
  url: z.string().url("URL inválida"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
