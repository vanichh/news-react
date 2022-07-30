import moment from "moment";

export const todayDate = (): string => {
  return moment().format("yyyy-MM-D");
}