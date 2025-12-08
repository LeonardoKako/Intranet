import { UserIcon } from "lucide-react";
import { HeaderMain } from "./HeaderMain";

export function MainProfile() {
  return (
    <main className='w-full min-h-[89.8vh] bg-gray-100 p-6 px-10 rounded'>
      <HeaderMain title='Perfil' icon={<UserIcon size={56} />} />
    </main>
  );
}
