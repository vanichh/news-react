import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IInput } from "components/header/header";
import { URL_API, KEY_API, INIT_VALUE } from "lib/constants";
import { todayDate } from "lib/helps/date";
import { Response } from "lib/types";

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
          to: todayDate(),
          sortBy: "popularity",
          language: "ru",
          apiKey: KEY_API,
        },
      }),
    }),
    searhNews: builder.mutation<Response, IInput>({
      query: ({ search, time, sort }) => ({
        url: `/everything`,
        params: {
          q: search,
          from: time,
          sortBy: sort,
          language: "ru",
          apiKey: KEY_API,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
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
