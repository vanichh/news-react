import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
  isError: boolean;
  text: string;
}

const initialState: ErrorState = {
  isError: false,
  text: "",
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, { payload }: PayloadAction<string>) => {
      state.isError = true;
      state.text = payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
