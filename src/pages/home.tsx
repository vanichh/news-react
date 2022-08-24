/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { useSearhNewsMutation } from "store/api/news";
import { Loading } from "components/loading";
import { NoResult } from "components/no-result";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "lib/hooks";
import { setError } from "store/slices/error";
import { ListNews } from "components/list-news";
import { ErrorRespone } from "lib/types/error-api";
import { LayoutsSearch } from "components/layouts";

export const Home: FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { numberPage, showNews } = useSelector((store) => store.pagination);
  const { search, sort, time } = useSelector((store) => store.search);
  const [fetch, { isLoading, data, error, isError }] = useSearhNewsMutation();
  useEffect(() => {
    fetch({ numberPage, search, sort, time, showNews });
  }, [numberPage, search, showNews, sort, time]);

  useEffect(() => {
    if (isError) {
      if ("error" in error!) {
        dispatch(setError(error.error));
      }
      if ("data" in error!) {
        const { data } = error as ErrorRespone;
        dispatch(setError(data.message));
      }
      navigation("/error");
    }
  }, [isError, error]);

  const Result = data?.totalResults ? (
    <ListNews listNews={data.articles} />
  ) : (
    <NoResult />
  );
  return <LayoutsSearch>{isLoading ? <Loading /> : Result}</LayoutsSearch>;
};

export default Home;
