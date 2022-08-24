import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface IProps {
  children: ReactNode;
}

const modalHTML = document.getElementById("modal") as HTMLElement;

export const Modal: FC<IProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <div
      className={` 
      h-full z-50 w-full absolute top-0 left-0 flex
      justify-center items-center bg-[#000000b3]`}
    >
      {children}
    </div>,
    modalHTML
  );
};
