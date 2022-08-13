import { FC, useState } from "react";
import { todayDate } from "lib/helps/date";
import { TEvent } from "lib/types";
import { useDispatch } from "lib/hooks";
import { setTime } from "store/slices/search";
export const InputTime: FC = () => {
  const [value, setValue] = useState(todayDate());

  const dispatch = useDispatch();

  const handlerTime = ({ target }: TEvent) => {
    if (target.value === "") return;
    setValue(target.value);
    dispatch(setTime(target.value));
  };

  return (
    <input
      className='ml-2 px-2 border h-8 rounded-md'
      value={value}
      onChange={handlerTime}
      type={"date"}
    />
  );
};
