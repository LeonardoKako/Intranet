// src/constants/CATEGORY_ICON_MAP.ts
import {
  KeyRoundIcon,
  ServerIcon,
  CloudIcon,
  NetworkIcon,
  ShieldCheckIcon,
  FolderIcon,
  ShieldUserIcon,
} from "lucide-react";

export const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  Acessos: KeyRoundIcon,
  Usuários: ShieldUserIcon,
  Servidores: ServerIcon,
  Cloud: CloudIcon,
  Rede: NetworkIcon,
  Segurança: ShieldCheckIcon,
  Documentação: FolderIcon,
};
