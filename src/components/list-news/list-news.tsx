import { CartNews } from "components/cart-news";
import { ICartNews } from "lib/types";
import { FC } from "react";

interface IProps {
  listNews: ICartNews[];
}

export const ListNews: FC<IProps> = ({ listNews }) => {
  return (
    <section className='grid items-stretch gap-y-[30px] grid-cols-2 justify-items-center'>
      {listNews.map((item) => (
        <CartNews key={item.url} {...item} />
      ))}
    </section>
  );
};
