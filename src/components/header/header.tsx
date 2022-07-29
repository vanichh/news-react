import { FC, useState, ChangeEvent, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useLazySearhNewsQuery } from "store/api/news";

export const Header: FC = () => {
  const [value, setValue] = useState<string>("");
  const [valueTime, setValueTime] = useState("");

  const [fetch, { isLoading, data }] = useLazySearhNewsQuery();

  const debounced = useDebouncedCallback((value) => fetch(value), 1000);

  const hanlerSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
    debounced(target.value);
  };

  const handlerTime = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValueTime(target.value);
  };

  useEffect(() => {
    if (isLoading) {
    }
  }, [data, isLoading]);

  return (
    <header className='flex flex-col items-center my-4 sticky top-0 bg-white'>
      <h1 className='uppercase text-2xl'>News feed</h1>
      <div className='flex items-center'>
        <input
          value={value}
          onChange={hanlerSearch}
          className='pl-2 border focus-visible:outline-none h-8 w-96 rounded-md my-4'
          type={"search"}
        />
        <input
          className='ml-4 border h-9 rounded-md'
          value={valueTime}
          onChange={handlerTime}
          type={"date"}
        />
      </div>
    </header>
  );
};
