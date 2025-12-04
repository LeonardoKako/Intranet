import { XIcon } from "lucide-react";

type Props = {
  icon: React.ReactNode;
  title: string;
  form: React.ReactNode;
  functionState: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Modal({ icon, title, form, functionState }: Props) {
  return (
    <>
      <div className='absolute top-0 left-0 z-10 w-screen h-screen bg-black opacity-30'></div>
      <main className='fixed inset-0 flex items-center justify-center z-20'>
        <div className='w-[560px] h-[560px] bg-white rounded-3xl px-8 py-6'>
          <header className='flex items-center gap-4'>
            {icon}
            <h1 className='text-3xl font-semibold'>{title}</h1>
            <XIcon
              size={36}
              className='ml-auto cursor-pointer hover:scale-110 transition hover:text-red-500'
              onClick={() => functionState(false)}
            />
          </header>
          <div className='bg-gray-400 mx-auto w-full h-0.5 my-6 rounded'></div>
          {form}
        </div>
      </main>
    </>
  );
}
