import { Request, Response, NextFunction} from "express";
import { validationResult, FieldValidationError } from "express-validator";
import { errorMessageType, errorsType } from "../types/errors.type";


export const errorHandler = (req: Request, res: Response, next: NextFunction) => {
    const data = validationResult(req).array({ onlyFirstError: true }) as FieldValidationError[];
    if (data.length) {
      const errorsMessages: errorMessageType[] = data.map(e => {
        return {message: e.msg, field: e.path}
      })
      const errors: errorsType = { errorsMessages };
      res.status(400).json(errors);
      return;
    }
    next();
  }