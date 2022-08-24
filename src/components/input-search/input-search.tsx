import { FC, useEffect, useState, } from "react";
import { TEvent } from "lib/types";
import { useDispatch, useSelector } from "lib/hooks";
import { setSearch } from "store/slices/search";
import { useDebouncedCallback } from "use-debounce";
import { Spiner } from "ui/spiner";
import { useSearhNewsMutation } from "store/api/news";
import { INIT_VALUE } from "lib/constants";

export const InputSeatch: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>(INIT_VALUE);
  console.log(value);
  const [, { isLoading }] = useSearhNewsMutation();
  const { countNews } = useSelector((store) => store.pagination);

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
        {!countNews ? "Не найдено" : `Найдено: ${countNews}`}
      </span>
      {isLoading && <Spiner className='absolute right-0' />}
    </label>
  );
};
