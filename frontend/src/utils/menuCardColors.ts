// src/components/menuCardColors.ts
type ColorName =
  | "orange"
  | "blue"
  | "teal"
  | "red"
  | "green"
  | "purple"
  | "pink"
  | "yellow";

const base1 =
  "absolute bottom-0 -left-20 w-full h-1/2 bg-gradient-to-b transition-all duration-500 ease-out group-hover:h-[65%] rounded-t-[40%]";
const base2 =
  "absolute bottom-0 left-10 w-full h-1/2 bg-gradient-to-b transition-all duration-500 ease-out group-hover:h-[65%] rounded-t-[40%]";

// Apenas as partes de cor mudam — o resto é reaproveitado.
export const COLOR_MAP: Record<
  ColorName,
  {
    wave1: string;
    wave2: string;
  }
> = {
  orange: {
    wave1: `${base1} from-orange-300 to-orange-500`,
    wave2: `${base2} from-orange-400 to-orange-600`,
  },
  blue: {
    wave1: `${base1} from-blue-300 to-blue-500`,
    wave2: `${base2} from-blue-400 to-blue-600`,
  },
  teal: {
    wave1: `${base1} from-teal-300 to-teal-500`,
    wave2: `${base2} from-teal-400 to-teal-600`,
  },
  red: {
    wave1: `${base1} from-red-300 to-red-500`,
    wave2: `${base2} from-red-400 to-red-600`,
  },
  green: {
    wave1: `${base1} from-green-300 to-green-500`,
    wave2: `${base2} from-green-400 to-green-600`,
  },
  purple: {
    wave1: `${base1} from-purple-300 to-purple-500`,
    wave2: `${base2} from-purple-400 to-purple-600`,
  },
  pink: {
    wave1: `${base1} from-pink-300 to-pink-500`,
    wave2: `${base2} from-pink-400 to-pink-600`,
  },
  yellow: {
    wave1: `${base1} from-yellow-300 to-yellow-500`,
    wave2: `${base2} from-yellow-400 to-yellow-600`,
  },
};

export type { ColorName };
