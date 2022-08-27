import { ChangeEvent } from "react";

export type TInputsValue = {
  search: string;
  time: string;
  sort: "publishedAt" | "popularity";
  numberPage: number;
  showNews: number;
  keyApi: string;
};
export type TEvent<T = HTMLInputElement> = ChangeEvent<T>;
