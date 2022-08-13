import { TEvent } from "lib/types";
import { useDispatch } from "react-redux";
import { SearchState, setSort } from "store/slices/search";

export const SelectSort = () => {
  const dispatch = useDispatch();

  const hadlerSort = ({ target }: TEvent<HTMLSelectElement>) => {
    dispatch(setSort(target.value as SearchState["sort"]));
  };

  return (
    <select onChange={hadlerSort} className='ml-2 px-2 border h-8 rounded-md'>
      <option value='publishedAt'>По дате</option>
      <option value='popularity'>По популярности</option>
    </select>
  );
};
