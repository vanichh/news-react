import { useDispatch, useSelector } from "lib/hooks";
import { FC, useState } from "react";
import { setPage } from "store/slices/pagination";
import cn from "classnames";

const initState = {
  start: 0,
  end: 10,
};

const CLASS_NAME_BTN = `h-7 w-7 rounded-sm border flex items-center justify-center disabled:text-neutral-400`;

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
    .map((v, i) => v + i);

  const handlerTogglePage = (num: number) => {
    if (num === 1) {
      setViewPage(initState);
    } else if (num === viewPage.end) {
      setViewPage((prev) => ({ start: prev.start + 9, end: prev.end + 9 }));
    } else if (viewPage.start - num === 0) {
      setViewPage((prev) => ({ start: prev.start - 9, end: prev.end - 9 }));
    }

    dispatch(setPage(num));
  };

  return (
    <section className=' w-full flex items-center justify-center'>
      <button
        disabled={numberPage === 1}
        onClick={() => handlerTogglePage(1)}
        className={CLASS_NAME_BTN}
      >
        {"<<"}
      </button>
      <button
        disabled={numberPage === 1}
        onClick={() => handlerTogglePage(numberPage - 1)}
        className={CLASS_NAME_BTN}
      >
        {"<"}
      </button>
      {arrButton.slice(viewPage.start, viewPage.end).map((item) => (
        <button
          onClick={() => handlerTogglePage(item)}
          className={cn(CLASS_NAME_BTN, {
            "border-amber-700": item === numberPage,
          })}
          key={item}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() => handlerTogglePage(numberPage + 1)}
        disabled={numberPage === countPage}
        className={CLASS_NAME_BTN}
      >
        {">"}
      </button>
      <button
        onClick={() => handlerTogglePage(countPage)}
        disabled={numberPage === countPage}
        className={CLASS_NAME_BTN}
      >
        {">>"}
      </button>
    </section>
  );
};
