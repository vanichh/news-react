import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_API, URL_API_HOME, KEY_API } from "lib/constants";
import { todayDate } from "lib/helps/date";
import { Response } from "lib/types";

export const newsHomeApi = createApi({
  reducerPath: "newsHomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL_API }),
  endpoints: (builder) => ({
    getNews: builder.query<Response, void>({
      query: () => `${URL_API_HOME}`,
    }),
    searhNews: builder.mutation<Response, string>({
      query: (serach) =>
        `/everything?q=${serach}&from=${todayDate()}&sortBy=publishedAt&apiKey=${KEY_API}`,
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const upd = dispatch(
          newsHomeApi.util.updateQueryData("getNews", undefined, (draft) => {
            Object.assign(draft, data);
          })
        );
      },
    }),
  }),
});

export const { useGetNewsQuery, useSearhNewsMutation } = newsHomeApi;
