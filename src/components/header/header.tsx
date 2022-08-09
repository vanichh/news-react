import { FC, useState, ChangeEvent, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearhNewsMutation } from "store/api/news";
import { todayDate } from "lib/helps/date";
import { INIT_VALUE } from "lib/constants";

type TEvent<T = HTMLInputElement> = ChangeEvent<T>;
export type IInput = {
  search: string;
  time: string;
  sort: "publishedAt" | "popularity";
};

const initValueInput: IInput = {
  search: INIT_VALUE,
  time: todayDate(),
  sort: "publishedAt",
};

export const Header: FC = () => {
  const [valueInput, setValueInput] = useState(initValueInput);

  const [fetch, { isLoading, data }] = useSearhNewsMutation();

  const debounced = useDebouncedCallback((value) => fetch(value), 1000);

  const hanlerSearch = ({ target }: TEvent) => {
    setValueInput((prev) => ({ ...prev, search: target.value }));
    debounced(valueInput);
  };

  const handlerTime = ({ target }: TEvent) => {
    if (target.value === "") return;
    setValueInput((prev) => ({ ...prev, time: target.value }));
    fetch(valueInput);
  };

  const hadlerSort = ({ target }: TEvent<HTMLSelectElement>) => {
    const sort = target.value as IInput["sort"];
    setValueInput((prev) => ({ ...prev, sort }));
    fetch(valueInput);
  };

  useEffect(() => {
    if (!isLoading) {
    }
  }, [data, isLoading]);

  return (
    <header className='flex sticky top-[-35px]  flex-col items-center my-4  bg-white'>
      <h1 className='uppercase text-2xl'>News feed</h1>
      <form className='flex items-center my-4'>
        <input
          value={valueInput.search}
          onChange={hanlerSearch}
          className='pl-2 px-2 border focus-visible:outline-none h-8 w-96 rounded-md'
          type={"search"}
        />
        <input
          className='ml-2 px-2 border h-8 rounded-md'
          value={valueInput.time}
          onChange={handlerTime}
          type={"date"}
        />
        <select
          onChange={hadlerSort}
          className='ml-2 px-2 border h-8 rounded-md'
        >
          <option value='publishedAt'>По дате</option>
          <option value='popularity'>По популярности</option>
        </select>
      </form>
    </header>
  );
};
