import { FC } from "react";
import { useGetNewsQuery } from "store/api/news";
import { Loading } from "components/loading";
import { NoResult } from "components/no-result";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "lib/hooks";
import { setError } from "store/slices/error";
import { Pagination } from "components/pagination";
import { Header } from "components/header";
import { ListNews } from "components/list-news";

export const Home: FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { numberPage, showNews } = useSelector((store) => store.pagination);
  const { search, sort, time } = useSelector((store) => store.search);
  const { isLoading, data, error, isError } = useGetNewsQuery({
    numberPage,
    search,
    sort,
    time,
    showNews,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    if ("error" in error) {
      dispatch(setError(error.error));
    }
    navigation("/error");
  }

  return (
    <>
      <Header />
      <Pagination />
      {!data?.totalResults ? (
        <NoResult />
      ) : (
        <ListNews listNews={data.articles} />
      )}
    </>
  );
};

export default Home;
