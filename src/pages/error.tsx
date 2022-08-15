import { useSelector } from "lib/hooks";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  text?: string;
}

export const Error: FC<IProps> = () => {
  const navigate = useNavigate();
  const { text } = useSelector((store) => store.error);

  const handlerGoHome = () => navigate("/", { replace: true });

  return (
    <main className='flex flex-col h-full w-full justify-center items-center'>
      <h1 className='text-2xl mb-4'>Произошла ошибка</h1>
      {text ? <p className='text-base mb-6'>{text}</p> : null}
      <button className='border py-1 px-2 rounded-md' onClick={handlerGoHome}>
        Вернуться на главную
      </button>
    </main>
  );
};

export default Error;
