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
    <main>
      <p>{text || "Произошла ошибка"}</p>
      <button onClick={handlerGoHome}>Вернуться на главную</button>
    </main>
  );
};

export default Error;
