import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { NavLink } from "react-router";
import Header from "../components/Header";
import { SideBar } from "../components/SideBar";

export default function NotFound() {
  return (
    <section className='w-screen min-h-screen bg-gray-400 overflow-hidden'>
      <Header />
      <SideBar />
      <div className='max-w-[86vw] lg:max-w-[84vw] ml-[14.1vw] lg:ml-[16.1vw] mt-[9.8vh] rounded'>
        <main className='w-full min-h-[89.8vh] bg-gray-100 rounded flex items-center justify-center'>
          <div className='text-center flex flex-col items-center gap-2 animate-pulse'>
            {/* Adicionado animate-bounce */}
            <h1 className='text-9xl font-bold mb-4'>404</h1>
            {/* Adicionado ícone */}
            <div className='mb-4'>
              <SearchIcon size={64} className='text-gray-400' />
            </div>
            <h2 className='text-2xl'>Página não encontrada!!!</h2>
            <NavLink
              to='/home'
              className='text-3xl text-blue-500 hover:underline mt-4 flex items-center gap-2 hover:scale-105 transition-transform'
            >
              <ArrowLeftIcon size={24} />
              Voltar para a página inicial
            </NavLink>
          </div>
        </main>
      </div>
    </section>
  );
}
