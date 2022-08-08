import { FC } from "react";
import { CartNews } from "components/cart-news";
import { useGetNewsQuery } from "store/api/news";
import { Loading } from "components/loading";

export const Home: FC = () => {
  const { isLoading, currentData, } = useGetNewsQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='grid gap-y-[30px] grid-cols-2 justify-items-center'>
      {currentData?.articles.map((item) => (
        <CartNews key={item.url} {...item} />
      ))}
    </section>
  );
};
