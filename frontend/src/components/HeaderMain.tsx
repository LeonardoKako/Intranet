type Props = {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

export function HeaderMain({ title, icon, children }: Props) {
  return (
    <>
      <div className='flex items-center gap-6 mt-4'>
        {icon}
        <h1 className='text-3xl font-semibold'>{title}</h1>
        {children}
      </div>
      <div className='bg-gray-400 mx-auto w-full h-0.5 my-6 rounded'></div>
    </>
  );
}
