import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TInputsValue } from "lib/types";
import { URL_API, KEY_API, INIT_VALUE } from "lib/constants";
import { todayDate } from "lib/helps/date";
import { Response } from "lib/types";
import { setCount } from "store/slices/pagination";

export const newsHomeApi = createApi({
  reducerPath: "newsHomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL_API }),
  endpoints: (builder) => ({
    getNews: builder.query<Response, void>({
      query: () => ({
        url: `/everything`,
        params: {
          q: INIT_VALUE,
          from: todayDate(),
          sortBy: "publishedAt",
          language: "ru",
          apiKey: KEY_API,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(setCount(data.totalResults));
      },
    }),
    searhNews: builder.mutation<Response, TInputsValue>({
      query: ({ search, time, sort, page }) => ({
        url: `/everything`,
        params: {
          q: search,
          from: time,
          sortBy: sort,
          language: "ru",
          pageSize: 10,
          page,
          apiKey: KEY_API,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCount(data.totalResults));
        dispatch(
          newsHomeApi.util.updateQueryData("getNews", undefined, (draft) => {
            Object.assign(draft, data);
          })
        );
      },
    }),
  }),
});

export const { useGetNewsQuery, useSearhNewsMutation } = newsHomeApi;
