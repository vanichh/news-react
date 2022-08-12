import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PaginationState {
  count: number;
  page: number;
  size: number;
}

const initialState: PaginationState = {
  page: 1,
  size: 10,
  count: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setSize: (state, { payload }: PayloadAction<number>) => {
      state.size = payload;
    },
    setCount: (state, { payload }: PayloadAction<number>) => {
      state.count = payload;
    },
  },
});

export const { setPage, setSize, setCount } = paginationSlice.actions;

export default paginationSlice.reducer;
