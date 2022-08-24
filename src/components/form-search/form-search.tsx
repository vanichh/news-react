import { FormEvent, useState, useMemo } from "react";
import { useSearhNewsMutation } from "store/api/news";
import { useSelector } from "lib/hooks";
import { InputSeatch } from "components/input-search";
import { InputTime } from "components/input-time";
import { SelectSort } from "components/select-sort";
import { SelectCountNews } from "components/select-count-news";

export const FormSearch = () => {
  const { numberPage, showNews } = useSelector((store) => store.pagination);
  const { search, sort, time } = useSelector((store) => store.search);
  const [fetch] = useSearhNewsMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch({ search, numberPage, time, sort, showNews });
  };

  const handlerShow = (e: any) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <form onSubmit={handlerSubmit} className='items-center my-4'>
      <div className='flex flex-wrap'>
        <InputSeatch />
        <InputTime />
        <SelectSort />
      </div>
      <div className='w-full shrink-0 flex flex-col items-start'>
        <button type='button' onClick={handlerShow}>
          Доп параметры
        </button>
        {isOpen && <SelectCountNews />}
      </div>
    </form>
  );
};
