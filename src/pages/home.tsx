import { FC } from "react";
import { CartNews } from "components/cart-news";
import { useGetNewsQuery } from "store/api/news";
import { Loading } from "components/loading";
import { NoResult } from "components/no-result";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "lib/hooks";
import { setError } from "store/slices/error";

export const Home: FC = () => {
  const { isLoading, currentData } = useGetNewsQuery();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loading />;
  }
  if (currentData?.totalResults === 0) {
    return <NoResult />;
  }
  if (currentData?.status === "error") {
    dispatch(setError(currentData.message as string));
    navigation("/error");
  }

  return (
    <section className='grid items-stretch gap-y-[30px] grid-cols-2 justify-items-center'>
      {currentData?.articles.map((item) => (
        <CartNews key={item.url} {...item} />
      ))}
    </section>
  );
};

export default Home;
