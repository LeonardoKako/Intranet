import { FolderIcon, HouseIcon } from "lucide-react";
import Header from "../components/Header";
import { SideBar } from "../components/SideBar";
import { MenuCard } from "../components/MenuCard";
import { useEffect, useState } from "react";
import { categoryService } from "../api/categoryService";
import type { Category } from "../types/types";
import { CATEGORY_ICON_MAP } from "../utils/categoryIconMap";
import { CATEGORY_COLOR_MAP } from "../utils/categoryMapColor";
import { COLOR_MAP } from "../utils/menuCardColors";

export default function Home() {
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
    <section className='w-screen min-h-screen bg-gray-400'>
      <Header />
      <div className='mt-[0.2vh] flex gap-[0.2vh]'>
        <SideBar user={{ nickname: "Leo" }} />
        <main className='w-full min-h-[89.8vh] bg-gray-100 p-6 px-10 rounded'>
          <div className='flex items-center gap-6 mt-4'>
            <HouseIcon size={56} />
            <h1 className='text-3xl font-semibold'>Home</h1>
          </div>
          <div className='bg-gray-400 mx-auto w-full h-0.5 my-6 rounded'></div>
          <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 px-10'>
            {categories.map((category) => {
              const Icon = CATEGORY_ICON_MAP[category.name] ?? FolderIcon;

              const colorName = CATEGORY_COLOR_MAP[category.name] ?? "purple";

              // aqui está a correção
              const colorObj = COLOR_MAP[colorName];

              return (
                <MenuCard
                  key={category.id}
                  title={category.name}
                  description={category.description}
                  color={colorName}
                  // agora o ícone usa a cor correspondente ao wave3
                  children={<Icon size={36} className={colorObj.wave3} />}
                />
              );
            })}
          </div>
        </main>
      </div>
    </section>
  );
}
