import { CircleUserRoundIcon, HouseIcon, SquarePenIcon } from "lucide-react";

type Props = {
  user: {
    nickname: string;
  };
};

export function SideBar({ user }: Props) {
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
        <ul className='flex flex-col gap-1 '>
          <li
            className='flex items-center gap-2 p-2 py-4 rounded 
          hover:bg-rose-400 hover:text-gray-100 cursor-pointer transition'
          >
            <HouseIcon size={20} />
            <a href='#'>Home</a>
          </li>
          {categories.map((category) => (
            <li
              className='flex items-center gap-2 p-2 py-4 rounded 
          hover:bg-rose-400 hover:text-gray-100 cursor-pointer transition'
            >
              <category.icon size={20} />
              <a href='#'>{category.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
