import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { todayDate } from "lib/helps/date";
import { INIT_VALUE } from "lib/constants";
import { setError } from "./error";

export interface SearchState {
  search: string;
  time: string;
  sort: "publishedAt" | "popularity";
}
const initialState: SearchState = {
  search: INIT_VALUE,
  time: todayDate(),
  sort: "publishedAt",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setTime: (state, { payload }: PayloadAction<string>) => {
      state.time = payload;
    },
    setSort: (state, { payload }: PayloadAction<SearchState["sort"]>) => {
      state.sort = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setError, () => {
      return initialState;
    });
  },
});

export const { setSearch, setTime, setSort } = searchSlice.actions;

export default searchSlice.reducer;
