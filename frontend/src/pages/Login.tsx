import type { Login } from "../types/types";
import Header from "../components/Header";
import { SideBar } from "../components/SideBar";
import { MainLogin } from "../components/MainLogin";

export default function Login() {
  return (
    <section className='w-screen min-h-screen bg-gray-400'>
      <Header />
      <div className='mt-[0.2vh] flex gap-[0.2vh]'>
        <SideBar />
        <MainLogin />
      </div>
    </section>
  );
}
