import { BadgePlusIcon, CopyIcon, PencilIcon, Trash2Icon } from "lucide-react";
import type { Login } from "../types/types";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "./Modal";
import { FormEdit } from "./FormEdit";

type Props = {
  logins: Login[];
};

function truncate(text: string, max: number) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
}

export function ModernTable({ logins }: Props) {
  const [openEditTable, setOpenEditTable] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [openCreateTable, setOpenCreateTable] = useState(false);

  const handleEditClick = (id: string) => {
    setSelectedId(id);
    setOpenEditTable(true);
  };

  const handleCopy = useCallback((value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Texto copiado!");
  }, []);

  return (
    <>
      {openEditTable && (
        <Modal
          title='Edite como quiser'
          icon={<PencilIcon size={32} />}
          form={<FormEdit id={selectedId!} />} // <-- envia o ID correto
          functionState={setOpenEditTable}
        />
      )}
      <div className='overflow-hidden rounded-xl border border-gray-300 shadow-sm'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-blue-400 text-white'>
              <th className='py-3 px-4 text-left'>Title</th>
              <th className='py-3 px-4 text-left'>Username</th>
              <th className='py-3 px-4 text-left'>Password</th>
              <th className='py-3 px-4 text-left'>URL</th>
              <th className='py-3 px-4 flex items-center justify-center'>
                <BadgePlusIcon
                  onClick={() => setOpenCreateTable(true)}
                  size={32}
                  className='hover:scale-110 cursor-pointer transition '
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {logins.map((item) => (
              <>
                <tr key={item.id} className='bg-white border-b border-gray-300'>
                  <td className='py-3 px-4 border-r border-gray-300'>
                    {truncate(item.title, 36)}
                  </td>
                  <td
                    className='py-3 px-4 border-r border-gray-300 
                flex items-center justify-between'
                    title='Clique para copiar'
                  >
                    {truncate(item.username, 48)}
                    <CopyIcon
                      size={18}
                      onClick={() => handleCopy(item.username)}
                      className='hover:scale-110 transition-transform hover:text-blue-400 cursor-pointer'
                    />
                  </td>
                  <td
                    className='py-3 px-4 border-r border-gray-300'
                    title='Clique para copiar'
                  >
                    <div className='flex items-center justify-between'>
                      {truncate(item.password, 56)}
                      <CopyIcon
                        size={18}
                        onClick={() => handleCopy(item.password)}
                        className='hover:scale-110 transition-transform hover:text-blue-400 cursor-pointer'
                      />
                    </div>
                  </td>
                  <td
                    className='py-3 px-4 border-r border-gray-300  
                flex items-center justify-between'
                    title='Clique para copiar'
                  >
                    {truncate(item.url, 64)}
                    <CopyIcon
                      size={18}
                      onClick={() => handleCopy(item.username)}
                      className='hover:scale-110 transition-transform hover:text-blue-400 cursor-pointer'
                    />
                  </td>
                  <td className='py-3 px-4'>
                    <span className='flex items-center justify-center gap-2'>
                      <PencilIcon
                        size={18}
                        onClick={() => handleEditClick(item.id)}
                        className='hover:scale-120 transition-transform hover:text-blue-400 cursor-pointer'
                      />
                      <Trash2Icon
                        size={18}
                        onClick={() => handleEditClick(item.id)}
                        className='hover:scale-120 transition-transform hover:text-red-500 cursor-pointer'
                      />
                    </span>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
