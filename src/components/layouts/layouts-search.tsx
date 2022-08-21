import { Header } from "components/header";
import { Pagination } from "components/pagination";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export const LayoutsSearch: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Pagination />
      {children}
    </>
  );
};
