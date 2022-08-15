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
      <p className='text-lg mb-6'>{text || "Произошла ошибка"}</p>
      <button className='border py-1 px-2 rounded-md' onClick={handlerGoHome}>
        Вернуться на главную
      </button>
    </main>
  );
};

export default Error;
