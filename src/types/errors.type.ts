export type ErrorsType = {
  errorsMessages: ErrorMessageType[];
};

export type ErrorMessageType = {
  message: string;
  field: string;
};
