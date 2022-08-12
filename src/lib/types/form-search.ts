import { ChangeEvent } from "react";

export type TInputsValue = {
  search: string;
  time: string;
  sort: "publishedAt" | "popularity";
  page: number;
};
export type TEvent<T = HTMLInputElement> = ChangeEvent<T>;
