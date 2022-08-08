import { FC, useState, ChangeEvent, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearhNewsMutation } from "store/api/news";
import { todayDate } from "lib/helps/date";

type TEvent = ChangeEvent<HTMLInputElement>;

export const Header: FC = () => {
  const [value, setValue] = useState<string>("");
  const [valueDate, setValueDate] = useState(todayDate());

  const [fetch, { isLoading, data }] = useSearhNewsMutation();

  const debounced = useDebouncedCallback((value) => fetch(value), 1000);

  const hanlerSearch = ({ target }: TEvent) => {
    setValue(target.value);
    debounced(target.value);
  };

  const handlerTime = ({ target }: TEvent) => {
    setValueDate(target.value);
  };

  useEffect(() => {
    console.log(data)
    if (!isLoading) {
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
          value={valueDate}
          onChange={handlerTime}
          type={"date"}
        />
      </div>
    </header>
  );
};
