import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KEY_API } from "lib/constants";

interface KeyApiState {
  keyApi: string;
  wordKey: boolean;
}

const initialState: KeyApiState = {
  keyApi: KEY_API + 'we' || localStorage.get("KEY_API") || "",
  wordKey: false,
};

export const keyApiSlice = createSlice({
  name: "keyApi",
  initialState,
  reducers: {
    getKeyApi: (state, { payload }: PayloadAction<string>) => {
      state.keyApi = payload;
    },
  },
});
export const { getKeyApi } = keyApiSlice.actions;

export default keyApiSlice.reducer;
