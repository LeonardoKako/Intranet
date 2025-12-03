import { ArrowRightIcon } from "lucide-react";
import clsx from "clsx";
import { COLOR_MAP, type ColorName } from "../utils/menuCardColors";
import { useNavigate } from "react-router";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  color: ColorName;
  link: string;
};

export function MenuCard({ title, description, children, color, link }: Props) {
  const navigate = useNavigate();

  const colors = COLOR_MAP[color];

  return (
    <div
      className={clsx(
        "relative w-56 h-64 rounded-2xl shadow-lg overflow-hidden cursor-pointer group",
        "hover:scale-105 hover:h-72 transition-all duration-300 bg-white"
      )}
      onClick={() => navigate(link)}
    >
      <div className={colors.wave1} />
      <div className={colors.wave2} />

      <div className='relative z-10 flex flex-col items-center text-center p-6 '>
        {children}
        <h2 className='text-xl font-semibold mt-1'>{title}</h2>
        <p className='text-white opacity-0 group-hover:opacity-100 transition-all duration-300 mt-12 text-center font-semibold px-6'>
          {description}
        </p>
        <ArrowRightIcon
          size={24}
          className='text-white opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2'
        />
      </div>
    </div>
  );
}
