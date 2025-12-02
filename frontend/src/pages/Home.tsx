import { HouseIcon, KeyRoundIcon } from "lucide-react";
import Header from "../components/Header";
import { SideBar } from "../components/SideBar";
import { MenuCard } from "../components/MenuCard";

export default function Home() {
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
            <MenuCard
              title='Logins'
              description='Controle de logins e senhas.'
              children={<KeyRoundIcon size={36} className='text-orange-400' />}
              color='orange'
            />
            <MenuCard
              title='Logins'
              description='Controle de logins e senhas.'
              children={<KeyRoundIcon size={36} className='text-red-400' />}
              color='red'
            />
            <MenuCard
              title='Logins'
              description='Controle de logins e senhas.'
              children={<KeyRoundIcon size={36} className='text-blue-400' />}
              color='blue'
            />
            <MenuCard
              title='Logins'
              description='Controle de logins e senhas.'
              children={<KeyRoundIcon size={36} className='text-green-400' />}
              color='green'
            />
            <MenuCard
              title='Logins'
              description='Controle de logins e senhas.'
              children={<KeyRoundIcon size={36} className='text-pink-400' />}
              color='pink'
            />
            <MenuCard
              title='Logins'
              description='Controle de logins e senhas.'
              children={<KeyRoundIcon size={36} className='text-teal-400' />}
              color='teal'
            />
            <MenuCard
              title='Logins'
              description='Controle de logins e senhas.'
              children={<KeyRoundIcon size={36} className='text-yellow-400' />}
              color='yellow'
            />
          </div>
        </main>
      </div>
    </section>
  );
}
