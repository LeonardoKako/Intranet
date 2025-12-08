import { NavLink } from "react-router";
import Header from "../components/Header";
import { SideBar } from "../components/SideBar";

export default function NotFound() {
  return (
    <section className='w-screen min-h-screen bg-gray-400'>
      <Header />
      <div className='mt-[0.2vh] flex gap-[0.2vh]'>
        <SideBar />
        <main className='w-full min-h-[89.8vh] bg-gray-100 rounded flex items-center justify-center'>
          <div className='text-center flex flex-col items-center gap-2'>
            <h1 className='text-9xl font-bold mb-4'>404</h1>
            <h2 className='text-2xl'>Página não encontrada!!!</h2>
            <NavLink to='/' className='text-3xl text-blue-500 hover:underline'>
              Voltar para a página inicial
            </NavLink>
          </div>
        </main>
      </div>
    </section>
  );
}
