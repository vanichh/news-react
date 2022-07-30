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
    searhNews: builder.query<Response, string>({
      query: (serach) =>
        `/everything?q=${serach}&from=${todayDate()}&sortBy=publishedAt&apiKey=${KEY_API}`,
    }),
  }),
});

export const { useGetNewsQuery, useLazySearhNewsQuery } = newsHomeApi;
