import { NextFunction, Response, Request } from "express";

export class apiError<T> extends Error {
  public statusCode;
  public data;

  constructor(message: string, statusCode: number, data?: T) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const errorHander = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof apiError) {
    if (err.data) {
      res.status(err.statusCode).send(err.data);
      return;
    }
    res.status(err.statusCode).send();
    return;
  }
  res.status(500).send();
};
