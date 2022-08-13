import { FC } from "react";

export const SelectCountNews: FC = () => {
  return (
    <label>
      <span>Кол-во новостей</span>
      <select>
        <option value='20'>20</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
      </select>
    </label>
  );
};
