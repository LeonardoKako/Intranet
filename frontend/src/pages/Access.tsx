import Header from "../components/Header";
import { MainAccess } from "../components/MainAccess";
import { SideBar } from "../components/SideBar";

export default function Access() {
  return (
    <section className='w-screen min-h-screen bg-gray-400 overflow-hidden'>
      <Header />
      <SideBar />
      <div className='max-w-[86vw] lg:max-w-[84vw] ml-[14.1vw] lg:ml-[16.1vw] mt-[10vh]'>
        <MainAccess />
      </div>
    </section>
  );
}
