import { FC, useState } from "react";
import { TEvent } from "lib/types";
import { useDispatch } from "lib/hooks";
import { setSearch } from "store/slices/search";
import { useDebouncedCallback } from "use-debounce";
import { Spiner } from "ui/spiner";
import { useSearhNewsMutation } from "store/api/news";
export const InputSeatch: FC = () => {
  const [value, setValue] = useState("");

  const [, { isLoading, data }] = useSearhNewsMutation();

  const dispatch = useDispatch();

  const debounced = useDebouncedCallback(
    (value) => dispatch(setSearch(value)),
    1000
  );
  const handlerSearch = ({ target }: TEvent) => {
    setValue(target.value);
    if (target.value === "") return;
    debounced(target.value);
  };

  return (
    <label className='relative'>
      <input
        value={value}
        onChange={handlerSearch}
        className={`pl-2 px-2 border focus-visible:outline-none h-8 w-[500px] rounded-md`}
        type={"search"}
      />
      <span className='absolute top-[6px] right-12 opacity-40 text-sm'>
        {!data?.totalResults ? "Не найдено" : `Найдено: ${data.totalResults}`}
      </span>
      {isLoading && <Spiner className='absolute right-0' />}
    </label>
  );
};
