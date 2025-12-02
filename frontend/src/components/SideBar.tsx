import {
  CircleUserRoundIcon,
  FolderIcon,
  HouseIcon,
  SquarePenIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { categoryService } from "../api/categoryService";
import type { Category } from "../types/types";
import { CATEGORY_ICON_MAP } from "../utils/categoryIconMap";
import {
  CATEGORY_COLOR_MAP,
  SIDEBAR_COLOR_CLASSES,
} from "../utils/categoryMapColor";

type Props = {
  user: {
    nickname: string;
  };
};

export function SideBar({ user }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadAll() {
      try {
        const [c] = await Promise.all([categoryService.getAll()]);
        setCategories(c);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    loadAll();
  }, []);

  return (
    <aside className='min-w-72 min-h-[89.8vh] bg-gray-100 p-6 flex flex-col text-black rounded'>
      <div className='mt-4 flex items-center gap-4'>
        <CircleUserRoundIcon size={56} />
        <div className='flex flex-col items-start justify-end'>
          <h2>{user.nickname}</h2>
          <div className='flex items-center justify-center gap-2 cursor-pointer hover:text-rose-600 transition'>
            <a href='#' className='text-sm'>
              Visualizar perfil
            </a>
            <SquarePenIcon size={14} className='mt-[2.5px]' />
          </div>
        </div>
      </div>

      <div className='bg-gray-400 mx-auto w-[80%] h-0.5 my-6 rounded'></div>

      <nav>
        <ul className='flex flex-col gap-1'>
          <li className='flex items-center gap-2 p-2 py-4 rounded hover:bg-rose-400 hover:text-gray-100 cursor-pointer transition'>
            <HouseIcon size={20} />
            <a href='#'>Home</a>
          </li>

          {categories.map((category) => {
            const Icon = CATEGORY_ICON_MAP[category.name] ?? FolderIcon;

            // pega cor específica da categoria
            const colorName = CATEGORY_COLOR_MAP[category.name] ?? "purple";

            // pega classes de hover correspondentes
            const colorClass = SIDEBAR_COLOR_CLASSES[colorName];

            return (
              <li
                key={category.id}
                className={`flex items-center gap-2 p-2 py-4 rounded cursor-pointer transition ${colorClass}`}
              >
                <Icon size={20} />
                <span>{category.name}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
