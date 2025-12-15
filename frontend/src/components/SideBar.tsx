import {
  CircleUserRoundIcon,
  FolderIcon,
  HomeIcon,
  SquarePenIcon,
  LogOutIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { categoryService } from "../api/categoryService";
import type { Category } from "../types/types";
import { CATEGORY_ICON_MAP } from "../utils/categoryIconMap";
import { CATEGORY_COLOR_MAP } from "../utils/categoryMapColor";
import { useAuthStore } from "../stores/AuthStore";
import { NavLink, useNavigate } from "react-router";

export function SideBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const categoriesData = await categoryService.getAll();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        // Se der erro 401 (não autorizado), o interceptor já redireciona
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const normalizeUrl = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <aside
      className='fixed top-[10vh] w-full max-w-[14vw] lg:max-w-[16vw] h-[calc(100vh-10vh)] bg-gray-100 text-gray-800 p-6 
    flex flex-col rounded-r-lg shadow-xl border-r border-gray-300 overflow-y-auto'
    >
      {/* User Profile Section */}
      <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6 border border-gray-200'>
        <div className='relative'>
          <CircleUserRoundIcon size={56} className='text-blue-500' />
          <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
        </div>
        <div className='flex-1 min-w-0'>
          <h2 className='font-bold text-lg truncate'>
            {user?.nickname || "Usuário"}
          </h2>
          <p className='text-sm text-gray-600 truncate'>{user?.email}</p>
          <div className='flex items-center gap-1 mt-1'>
            <NavLink
              to='/settings'
              className='text-sm text-blue-500 hover:text-blue-700 transition flex items-center gap-1'
            >
              <SquarePenIcon size={12} />
              Editar Perfil
            </NavLink>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='bg-gray-300 mx-auto w-full h-px my-4 rounded'></div>

      {/* Navigation */}
      <nav className='flex-1'>
        <h3 className='text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 px-2'>
          Navegação
        </h3>

        <ul className='space-y-1'>
          <li>
            <NavLink
              to='/home'
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                }`
              }
            >
              <HomeIcon size={20} />
              <span className='font-medium'>Home</span>
            </NavLink>
          </li>

          <li className='mt-6'>
            <h3 className='text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 px-2'>
              Categorias
            </h3>

            {loading ? (
              <div className='space-y-2'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-3 p-3 rounded-lg bg-gray-200 animate-pulse border border-gray-300'
                  >
                    <div className='w-5 h-5 bg-gray-300 rounded'></div>
                    <div className='h-4 bg-gray-300 rounded w-24'></div>
                  </div>
                ))}
              </div>
            ) : categories.length > 0 ? (
              <div className='space-y-1'>
                {categories.map((category) => {
                  const Icon = CATEGORY_ICON_MAP[category.name] || FolderIcon;
                  const colorName = CATEGORY_COLOR_MAP[category.name] || "blue";

                  // Classes para tema claro
                  const colorClassesLight: Record<string, string> = {
                    blue: "hover:bg-blue-500 hover:text-white",
                    green: "hover:bg-green-500 hover:text-white",
                    purple: "hover:bg-purple-500 hover:text-white",
                    orange: "hover:bg-orange-500 hover:text-white",
                    red: "hover:bg-red-500 hover:text-white",
                    teal: "hover:bg-teal-500 hover:text-white",
                    rose: "hover:bg-rose-500 hover:text-white",
                    yellow: "hover:bg-yellow-500 hover:text-white",
                  };

                  const colorClasses =
                    colorClassesLight[colorName] ||
                    "hover:bg-blue-500 hover:text-white";

                  return (
                    <NavLink
                      to={`/category/${normalizeUrl(category.name)}`}
                      key={category.id}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-all border border-gray-300 ${
                          isActive
                            ? `${colorClasses.replace(
                                "hover:",
                                ""
                              )} text-white shadow-md border-transparent`
                            : `text-gray-700 ${colorClasses} hover:border-transparent`
                        }`
                      }
                    >
                      <Icon size={20} />
                      <span className='font-medium truncate'>
                        {category.name}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            ) : (
              <div className='p-3 text-center text-gray-500 text-sm bg-gray-200 rounded-lg border border-gray-300'>
                Nenhuma categoria encontrada
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className='mt-auto pt-6 border-t border-gray-300'>
        <button
          onClick={handleLogout}
          className='flex items-center justify-center gap-3 w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all shadow hover:shadow-lg'
        >
          <LogOutIcon size={20} />
          <span>Sair</span>
        </button>

        <div className='mt-4 text-xs text-gray-500 text-center'>
          Sistema Interno • Unicesusc TI
        </div>
      </div>
    </aside>
  );
}
