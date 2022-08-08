import { FC, useState, ChangeEvent, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearhNewsMutation } from "store/api/news";
import { todayDate } from "lib/helps/date";
import { INIT_VALUE } from "lib/constants";

type TEvent = ChangeEvent<HTMLInputElement>;
type IInput = {
  search: string;
  time: string;
};

export const Header: FC = () => {
  const [value, setValue] = useState<IInput>({
    search: INIT_VALUE,
    time: todayDate(),
  });

  const [fetch, { isLoading, data }] = useSearhNewsMutation();

  const debounced = useDebouncedCallback((value) => fetch(value), 1000);

  const hanlerSearch = ({ target }: TEvent) => {
    setValue((prev) => ({ ...prev, search: target.value }));
    debounced(target.value);
  };

  const handlerTime = ({ target }: TEvent) => {
    setValue((prev) => ({ ...prev, time: target.value }));
  };

  useEffect(() => {
    if (!isLoading) {
    }
  }, [data, isLoading]);

  return (
    <header className='flex flex-col items-center my-4 sticky top-0 bg-white'>
      <h1 className='uppercase text-2xl'>News feed</h1>
      <div className='flex items-center my-4'>
        <input
          value={value.search}
          onChange={hanlerSearch}
          className='pl-2 px-2 border focus-visible:outline-none h-8 w-96 rounded-md'
          type={"search"}
        />
        <input
          className='ml-2 px-2 border h-8 rounded-md'
          value={value.time}
          onChange={handlerTime}
          type={"date"}
        />
        <select className='ml-2 px-2 border h-8 rounded-md'>
          <option value='publishedAt'>По дате</option>
          <option value='popularity'>По популярности</option>
        </select>
      </div>
    </header>
  );
};
