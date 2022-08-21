export interface IDataError {
  status: string;
  code: string;
  message: string;
}

export interface ErrorRespone {
  status: number;
  data: IDataError;
}
