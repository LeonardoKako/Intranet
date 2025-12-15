// components/Header.tsx
import logo from "../assets/onlyLogo.png";

export default function Header() {
  return (
    <header className='fixed top-0 left-0 w-full min-h-[9.8vh] px-10 flex items-center rounded bg-gray-100'>
      <div className='flex items-center gap-3'>
        <div className='w-16 h-12 bg-linear-to-r from-rose-400 to-rose-600 rounded-lg flex items-center justify-center px-2'>
          <img src={logo} alt='logo unicesusc' />
        </div>
        <h1 className='text-xl font-bold text-gray-800'>Intranet Unicesusc</h1>
        <span className='text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium'>
          v1.0.0
        </span>
      </div>

      <div className='ml-auto flex items-center gap-4'>
        <div className='hidden md:flex items-center gap-2 text-sm text-gray-600'>
          <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
          <span>Sistema Online</span>
        </div>
        <div className='w-px h-6 bg-gray-300'></div>
        <div className='text-sm text-gray-500'>
          TI • {new Date().toLocaleDateString("pt-BR")}
        </div>
      </div>
    </header>
  );
}
