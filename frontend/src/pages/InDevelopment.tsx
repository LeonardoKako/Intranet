// pages/InDevelopment.tsx
import { ConstructionIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router";
import Header from "../components/Header";
import { SideBar } from "../components/SideBar";

export default function InDevelopment() {
  return (
    <section className='w-screen min-h-screen bg-gray-400 overflow-hidden'>
      <Header />
      <SideBar />
      <div className='max-w-[86vw] lg:max-w-[84vw] ml-[14.1vw] lg:ml-[16.1vw] mt-[10vh]'>
        <div className='min-h-[90vh] flex flex-col items-center justify-center p-8 text-center bg-gray-100 '>
          <div className='relative'>
            <ConstructionIcon
              size={120}
              className='text-yellow-500 mb-6 animate-pulse'
            />
            <div className='absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full animate-bounce'></div>
          </div>

          <h1 className='text-4xl font-bold text-gray-800 mb-4'>
            Página em Desenvolvimento
          </h1>

          <p className='text-xl text-gray-500 max-w-2xl mb-8'>
            Esta funcionalidade está sendo desenvolvida com cuidado e atenção
            aos detalhes. Em breve você poderá aproveitar todas as novidades!
          </p>

          <div className='bg-gray-600 backdrop-blur-sm rounded-xl p-6 max-w-lg mb-8'>
            <h2 className='text-2xl font-semibold text-white mb-4'>
              O que estamos construindo?
            </h2>
            <ul className='text-gray-200 text-left space-y-2'>
              <li className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                Interface moderna e intuitiva
              </li>
              <li className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                Funcionalidades para melhorar sua produtividade
              </li>
              <li className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                Integração com outras ferramentas
              </li>
              <li className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                Sistema de relatórios avançados
              </li>
            </ul>
          </div>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              to='/home'
              className='px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg 
            hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl 
            flex items-center gap-2'
            >
              <HomeIcon size={20} />
              Voltar para Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className='px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition'
            >
              Voltar à página anterior
            </button>
          </div>

          <div className='mt-12 text-sm text-gray-800'>
            <p>Previsão de lançamento: Em breve</p>
            <p className='text-xs mt-2'>Unicesusc Intranet TI • Versão 1.0.0</p>
          </div>
        </div>
      </div>
    </section>
  );
}
