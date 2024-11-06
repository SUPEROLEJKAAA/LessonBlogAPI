import { Request, Response, NextFunction } from "express";
import { validationResult, FieldValidationError } from "express-validator";
import { ErrorMessageType, ErrorsType } from "../../types/errors.type";

export const validatorErrorHandler = (req: Request, res: Response, next: NextFunction) => {
  const data = validationResult(req).array({
    onlyFirstError: true,
  }) as FieldValidationError[];
  if (data.length) {
    const errorsMessages: ErrorMessageType[] = data.map(e => {
      return { message: e.msg, field: e.path };
    });
    const errors: ErrorsType = { errorsMessages };
    res.status(400).json(errors);
    return;
  }
  next();
};
