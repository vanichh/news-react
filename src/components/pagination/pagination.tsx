import { useDispatch, useSelector } from "lib/hooks";
import { FC, useState } from "react";
import { setPage } from "store/slices/pagination";
import cn from "classnames";

const initState = {
  start: 0,
  end: 10,
};

export const Pagination: FC = () => {
  const dispatch = useDispatch();
  const { numberPage, showNews, countNews } = useSelector(
    (store) => store.pagination
  );

  const [viewPage, setViewPage] = useState(initState);

  const countPage = Math.ceil(countNews / showNews);

  if (countPage === 1) {
    return null;
  }

  const arrButton: number[] = Array(countPage)
    .fill(1)
    .map((v, i) => ++i);

  const handlerTogglePage = (num: number) => {
    if (num % 10 === 0) {
      setViewPage({ start: viewPage.start + 10, end: viewPage.end + 10 });
    } else if (num % 10 === 1 && num !== 1) {
      setViewPage({ start: viewPage.start - 10, end: viewPage.end - 10 });
    }

    dispatch(setPage(num));
  };

  return (
    <section className=' w-full flex items-center justify-center'>
      <button
        disabled={numberPage === 1}
        onClick={() => handlerTogglePage(1)}
        className={`
          h-7 w-7 rounded-sm border flex
          items-center justify-center disabled:text-neutral-400`}
      >
        {"<<"}
      </button>
      <button
        disabled={numberPage === 1}
        onClick={() => handlerTogglePage(numberPage - 1)}
        className={`
          h-7 w-7 rounded-sm border flex
          items-center justify-center disabled:text-neutral-400`}
      >
        {"<"}
      </button>
      {arrButton.slice(viewPage.start, viewPage.end).map((item) => (
        <button
          onClick={() => handlerTogglePage(item)}
          className={cn(
            "h-7 w-7 rounded-sm border flex items-center justify-center",
            { "border-amber-700": item === numberPage }
          )}
          key={item}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() => handlerTogglePage(numberPage + 1)}
        disabled={numberPage === countPage}
        className={`
          h-7 w-7 rounded-sm border flex items-center
          justify-center disabled:text-neutral-400`}
      >
        {">"}
      </button>
      <button
        onClick={() => handlerTogglePage(countPage)}
        disabled={numberPage === countPage}
        className={`
          h-7 w-7 rounded-sm border flex items-center
          justify-center disabled:text-neutral-400`}
      >
        {">>"}
      </button>
    </section>
  );
};
