import { ChangeEvent } from "react";

export type TInputsValue = {
  search: string;
  time: string;
  sort: "publishedAt" | "popularity";
};
export type TEvent<T = HTMLInputElement> = ChangeEvent<T>;
