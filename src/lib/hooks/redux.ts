import {
  useDispatch as useHookDispatch,
  useSelector as useHookSelector,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "store/store";

export const useDispatch: () => AppDispatch = useHookDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useHookSelector;
