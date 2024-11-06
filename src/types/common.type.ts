import { ErrorMessageType } from "./errors.type";

export type Result<T> = {
    status: number | string; //0, 1,
    data?: T;
    errors?: ErrorMessageType[];
    message?: string;
  };