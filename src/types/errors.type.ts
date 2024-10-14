export type errorsType = {
    errorsMessages: errorMessageType[];
  };

export type errorMessageType = {
  message: string,
  field: string
}