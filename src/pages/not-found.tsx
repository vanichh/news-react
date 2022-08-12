import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: FC = () => {
  const navigation = useNavigate();

  const handlerClick = () => navigation("/");
  
  return (
    <main className='flex w-full flex-col items-center justify-center'>
      <div className='my-10'>Страница не найдена</div>
      <button className='border py-1 px-2 rounded-md' onClick={handlerClick}>
        Вернуться на главную
      </button>
    </main>
  );
};

export default NotFound;
