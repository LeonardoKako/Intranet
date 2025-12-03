import { CopyIcon } from "lucide-react";
import type { Login } from "../types/types";
import { useCallback } from "react";
import { toast } from "react-toastify";

type Props = {
  logins: Login[];
};

function truncate(text: string, max: number) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
}

export function ModernTable({ logins }: Props) {
  const handleCopy = useCallback((value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Texto copiado!");
  }, []);

  return (
    <div className='overflow-hidden rounded-xl border border-gray-300 shadow-sm'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-blue-400 text-white'>
            <th className='py-3 px-4 text-left'>Title</th>
            <th className='py-3 px-4 text-left'>Username</th>
            <th className='py-3 px-4 text-left'>Password</th>
            <th className='py-3 px-4 text-left'>Description</th>
            <th className='py-3 px-4 text-left'>URL</th>
          </tr>
        </thead>

        <tbody>
          {logins.map((item) => (
            <tr key={item.id} className='bg-gray-100 border-b border-gray-300'>
              <td className='py-3 px-4 border-r border-gray-300'>
                {truncate(item.title, 24)}
              </td>
              <td
                className='py-3 px-4 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition
                flex items-center justify-between'
                onClick={() => handleCopy(item.username)}
                title='Clique para copiar'
              >
                {truncate(item.username, 36)}
                <CopyIcon size={16} />
              </td>
              <td
                className='py-3 px-4 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition
              '
                onClick={() => handleCopy(item.username)}
                title='Clique para copiar'
              >
                <div className='flex items-center justify-between'>
                  {truncate(item.password, 40)}
                  <CopyIcon size={16} />
                </div>
              </td>
              <td className='py-3 px-4 border-r border-gray-300'>
                {truncate(item.description, 28)}
              </td>
              <td
                className='py-3 px-4 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition 
                flex items-center justify-between'
                onClick={() => handleCopy(item.url)}
                title='Clique para copiar'
              >
                {truncate(item.url, 32)}
                <CopyIcon size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
