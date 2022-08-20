import { FC } from "react";
import { FormSearch } from "components/form-search";

export const Header: FC = () => {
  return (
    <header className='flex sticky z-50 top-[-35px]  flex-col items-center my-4  bg-white'>
      <h1 className='uppercase text-2xl'>News feed</h1>
      <FormSearch />
    </header>
  );
};
