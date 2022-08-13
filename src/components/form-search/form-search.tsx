import { FormEvent, useEffect, useState } from "react";
import { useSearhNewsMutation } from "store/api/news";
import { useNavigate } from "react-router-dom";
import { useSelector } from "lib/hooks";
import { InputSeatch } from "components/input-search";
import { InputTime } from "components/input-time";
import { SelectSort } from "components/select-sort";
import { SelectCountNews } from "components/select-count-news";

export const FormSearch = () => {
  const { page } = useSelector((store) => store.pagination);
  const { search, sort, time } = useSelector((store) => store.search);
  const [fetch, { isLoading, data }] = useSearhNewsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      fetch({ search, page, time, sort });
    }
  }, [page, search, sort, time]);

  if (data?.status === "error") {
    navigate("/");
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlerSunmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch({ search, page, time, sort });
  };

  const handlerShow = () => setIsOpen((prev) => !prev);

  return (
    <form onSubmit={handlerSunmit} className='flex flex-wrap items-center my-4'>
      <InputSeatch />
      <InputTime />
      <SelectSort />
      <div className='w-full shrink-0 flex flex-col items-start'>
        <button onClick={handlerShow}>Доп параметры</button>
        {isOpen && <SelectCountNews />}
      </div>
    </form>
  );
};
