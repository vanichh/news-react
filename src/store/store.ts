import { configureStore } from "@reduxjs/toolkit";
import { newsHomeApi } from "./api/news";
import errorSlice from "./slices/error";
import paginationSlice from "./slices/pagination";

export const store = configureStore({
  reducer: {
    [newsHomeApi.reducerPath]: newsHomeApi.reducer,
    error: errorSlice,
    pagination: paginationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsHomeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
