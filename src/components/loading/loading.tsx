import { FC } from 'react';
import { Spiner } from 'ui/spiner';

interface IProps {
  className?: string;
}

export const Loading: FC<IProps> = ({ className = '!w-[300px] !h-[300px] !text-gray-300' }) => {
  return (
    <section className='w-full h-full flex items-center justify-center'>
      <Spiner className={className} />
    </section>
  );
};
