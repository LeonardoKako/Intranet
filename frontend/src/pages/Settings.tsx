import { useEffect, useState } from "react";
import { usersService } from "../api/userService";
import Header from "../components/Header";
import { MainProfile } from "../components/MainProfile";
import { SideBar } from "../components/SideBar";
import type { User } from "../types/types";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userFound = await usersService.getOne(
        "32cf333c-a0bd-450a-a9c4-4ee1e106cce6"
      );
      setUser(userFound);
    }

    fetchUser();
  }, []);

  if (!user) {
    return <div className='text-white p-5'>Carregando...</div>;
  }

  return (
    <section className='w-screen min-h-screen bg-gray-400'>
      <Header />
      <div className='mt-[0.2vh] flex gap-[0.2vh]'>
        <SideBar />
        <MainProfile user={user} />
      </div>
    </section>
  );
}
