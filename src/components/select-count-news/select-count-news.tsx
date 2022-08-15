import { useDispatch } from "lib/hooks";
import { TEvent } from "lib/types";
import { FC } from "react";
import { setShowNews } from "store/slices/pagination";

export const SelectCountNews: FC = () => {
  const dispatch = useDispatch();

  const handlerCountNews = ({ target }: TEvent<HTMLSelectElement>) => {
    dispatch(setShowNews(Number(target.value)));
  };

  return (
    <label>
      <select onChange={handlerCountNews} className='border rounded-md h-8'>
        <option value='20'>Кол-во новостей - 20</option>
        <option value='50'>Кол-во новостей - 50</option>
        <option value='100'>Кол-во новостей - 100</option>
      </select>
    </label>
  );
};
