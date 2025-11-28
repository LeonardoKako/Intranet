import { HouseIcon } from "lucide-react";
import Header from "../components/Header";
import { SideBar } from "../components/SideBar";

export default function Home() {
  return (
    <section className='w-screen h-screen bg-gray-400'>
      <Header />
      <div className='mt-[0.2vh] flex gap-[0.2vh]'>
        <SideBar />
        <main className='w-full h-[89.8vh] bg-gray-100 p-6 px-10 rounded'>
          <div className='flex items-center gap-6 mt-4'>
            <HouseIcon size={56} />
            <h1 className='text-3xl font-semibold'>Home</h1>
          </div>
          <div className='bg-gray-400 mx-auto w-full h-0.5 my-6 rounded'></div>
        </main>
      </div>
    </section>
  );
}
