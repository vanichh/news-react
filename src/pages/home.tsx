import { FC } from "react";
import { CartNews } from "components/cart-news";
import { nanoid } from "nanoid";
import { useGetNewsQuery } from "store/api/news";
import { Loading } from "components/loading";

export const Home: FC = () => {
  const { data, isLoading } = useGetNewsQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='grid gap-y-[30px] grid-cols-2 justify-items-center'>
      {data?.articles.map((item) => (
        <CartNews key={nanoid()} {...item} />
      ))}
    </section>
  );
};
