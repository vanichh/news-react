import { useDispatch, useSelector } from "lib/hooks";
import { FC } from "react";
import { setPage } from "store/slices/pagination";
import cn from "classnames";

export const Pagination: FC = () => {
  const dispatch = useDispatch();
  const { numberPage, showNews, countNews } = useSelector(
    (store) => store.pagination
  );

  const countPage = Math.ceil(countNews / showNews);

  if (countPage === 1) {
    return null;
  }

  const arrButton: number[] = Array(countPage)
    .fill(1)
    .map((v, i) => ++i);

  const handlerNumPage = (number: number) => {
    dispatch(setPage(number));
  };

  return (
    <section className=' w-full flex items-center justify-center'>
      {arrButton.map((item) => (
        <button
          onClick={() => handlerNumPage(item)}
          className={cn(
            "h-7 w-7 rounded-sm border flex items-center justify-center",
            { "border-amber-700": item === numberPage }
          )}
          key={item}
        >
          {item}
        </button>
      ))}
    </section>
  );
};
