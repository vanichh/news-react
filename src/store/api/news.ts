import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TInputsValue } from "lib/types";
import { URL_API, KEY_API } from "lib/constants";
import { Response } from "lib/types";
import { setCountNews } from "store/slices/pagination";

export const newsHomeApi = createApi({
  reducerPath: "newsHomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL_API }),
  endpoints: (builder) => ({
    getNews: builder.query<Response, TInputsValue>({
      query: ({ search, time, sort, numberPage, showNews }) => ({
        url: `/everything`,
        params: {
          q: search,
          from: time,
          sortBy: sort,
          language: "ru",
          pageSize: showNews,
          page: numberPage,
          apiKey: KEY_API,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(setCountNews(data.totalResults));
      },
    }),
    searhNews: builder.mutation<Response, TInputsValue>({
      query: ({ search, time, sort, numberPage, showNews }) => ({
        url: `/everything`,
        params: {
          q: search,
          from: time,
          sortBy: sort,
          language: "ru",
          pageSize: showNews,
          page: numberPage,
          apiKey: KEY_API,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCountNews(data.totalResults));
        dispatch(
          newsHomeApi.util.updateQueryData("getNews", arg, (draft) => {
            Object.assign(draft, data);
          })
        );
      },
    }),
  }),
});

export const { useGetNewsQuery, useSearhNewsMutation } = newsHomeApi;
