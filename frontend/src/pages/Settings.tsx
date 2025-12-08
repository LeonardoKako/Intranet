import Header from "../components/Header";
import { MainProfile } from "../components/MainProfile";
import { SideBar } from "../components/SideBar";

export default function Settings() {
  return (
    <section className='w-screen min-h-screen bg-gray-400'>
      <Header />
      <div className='mt-[0.2vh] flex gap-[0.2vh]'>
        <SideBar />
        <MainProfile />
      </div>
    </section>
  );
}
