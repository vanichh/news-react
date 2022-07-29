import { configureStore } from '@reduxjs/toolkit';
import { newsHomeApi } from './api/news';

export const store = configureStore({
  reducer: { [newsHomeApi.reducerPath]: newsHomeApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsHomeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
