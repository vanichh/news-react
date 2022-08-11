import { INIT_VALUE } from "lib/constants";
import { todayDate } from "lib/helps/date";
import { FormEvent, useState } from "react";
import { useSearhNewsMutation } from "store/api/news";
import { useDebouncedCallback } from "use-debounce";
import { TInputsValue, TEvent } from "lib/types";
import { Spiner } from "ui/spiner";
import { useNavigate } from "react-router-dom";

const initValueInput: TInputsValue = {
  search: INIT_VALUE,
  time: todayDate(),
  sort: "publishedAt",
};
export const FormSearch = () => {
  const [valueInput, setValueInput] = useState(initValueInput);

  const [fetch, { isLoading, data }] = useSearhNewsMutation();
  const navigate = useNavigate();

  if (data?.status === "error") {
    navigate("/");
  }

  const debounced = useDebouncedCallback((value) => fetch(value), 1000);

  const hanlerSearch = ({ target }: TEvent) => {
    const search = target.value;
    setValueInput((prev) => ({ ...prev, search }));
    if (search === "") return;
    debounced({ ...valueInput, search });
  };

  const handlerTime = ({ target }: TEvent) => {
    if (target.value === "") return;
    const time = target.value;
    setValueInput((prev) => ({ ...prev, time }));
    fetch({ ...valueInput, time });
  };

  const hadlerSort = ({ target }: TEvent<HTMLSelectElement>) => {
    const sort = target.value as TInputsValue["sort"];
    setValueInput((prev) => ({ ...prev, sort }));
    fetch({ ...valueInput, sort });
  };

  const handlerSunmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(valueInput);
  };

  return (
    <form onSubmit={handlerSunmit} className='flex items-center my-4'>
      <label className='relative'>
        <input
          value={valueInput.search}
          onChange={hanlerSearch}
          className='pl-2 px-2 border focus-visible:outline-none h-8 w-[500px] rounded-md'
          type={"search"}
        />
        <span className='absolute top-[6px] right-12 opacity-40 text-sm'>
          {!data?.totalResults ? "Не найдено" : `Найдено: ${data.totalResults}`}
        </span>
        {isLoading && <Spiner className='absolute right-0' />}
      </label>
      <input
        className='ml-2 px-2 border h-8 rounded-md'
        value={valueInput.time}
        onChange={handlerTime}
        type={"date"}
      />
      <select onChange={hadlerSort} className='ml-2 px-2 border h-8 rounded-md'>
        <option value='publishedAt'>По дате</option>
        <option value='popularity'>По популярности</option>
      </select>
    </form>
  );
};
