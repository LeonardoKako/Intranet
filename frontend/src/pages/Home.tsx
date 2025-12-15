import Header from "../components/Header";
import { SideBar } from "../components/SideBar";

import { MainHome } from "../components/MainHome";

export default function Home() {
  return (
    <section className='w-screen min-h-screen bg-gray-400 overflow-hidden'>
      <Header />
      <SideBar />
      <div className='max-w-[86vw] lg:max-w-[84vw] ml-[14.1vw] lg:ml-[16.1vw] mt-[9.8vh] rounded'>
        <MainHome />
      </div>
    </section>
  );
}
