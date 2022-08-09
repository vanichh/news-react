import { FC } from "react";
import { CartNews } from "components/cart-news";
import { useGetNewsQuery } from "store/api/news";
import { Loading } from "components/loading";
import { NoResult } from "components/no-result";

export const Home: FC = () => {
  const { isLoading, currentData } = useGetNewsQuery();

  if (isLoading) {
    return <Loading />;
  }
  if (currentData?.totalResults === 0) {
    return <NoResult />;
  }

  return (
    <section className='grid items-stretch gap-y-[30px] grid-cols-2 justify-items-center'>
      {currentData?.articles.map((item) => (
        <CartNews key={item.url} {...item} />
      ))}
    </section>
  );
};
