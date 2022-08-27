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
import { ModalKeyApi } from "components/modal-key-api";

export const Home: FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { numberPage, showNews } = useSelector((store) => store.pagination);
  const { search, sort, time } = useSelector((store) => store.search);
  const { keyApi } = useSelector((store) => store.keyApi);
  const [fetch, { isLoading, data, error, isError }] = useSearhNewsMutation();
  useEffect(() => {
    fetch({ numberPage, search, sort, time, showNews, keyApi });
  }, [numberPage, search, showNews, sort, time, keyApi]);

  useEffect(() => {
    if (isError) {
      if ("error" in error!) {
        dispatch(setError(error.error));
        navigation("/error");
      }
      if ("data" in error!) {
        const { data } = error as ErrorRespone;
        dispatch(setError(data.message));
        if (data.code !== "apiKeyInvalid") {
          navigation("/error");
        }
      }
    }
  }, [isError, error]);

  if (error) {
    const { data } = error as ErrorRespone;
    if (data.code === "apiKeyInvalid") {
      return <ModalKeyApi />;
    }
  }

  const Result = data?.totalResults ? (
    <ListNews listNews={data.articles} />
  ) : (
    <NoResult />
  );
  return <LayoutsSearch>{isLoading ? <Loading /> : Result}</LayoutsSearch>;
};

export default Home;
