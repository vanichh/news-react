import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PaginationState {
  countNews: number;
  numberPage: number;
  showNews: number;
}

const initialState: PaginationState = {
  numberPage: 1,
  showNews: 10,
  countNews: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.numberPage = payload;
    },
    setShowNews: (state, { payload }: PayloadAction<number>) => {
      state.showNews = payload;
    },
    setCountNews: (state, { payload }: PayloadAction<number>) => {
      state.countNews = payload;
    },
  },
});

export const {
  setPage,
  setShowNews,
  setCountNews,
} = paginationSlice.actions;

export default paginationSlice.reducer;
