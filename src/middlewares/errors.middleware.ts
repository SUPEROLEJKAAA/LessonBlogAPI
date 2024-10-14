import { Request, Response, NextFunction} from "express";
import { validationResult, FieldValidationError } from "express-validator";
import { errorMessageType, errorsType } from "../types/errors.type";


export const errorHandler = (req: Request, res: Response, next: NextFunction) => {
    const data = validationResult(req).array() as FieldValidationError[];
    if (data.length) {
      const errorsMessages: errorMessageType[] = data.reduce((acc, cur) => {
        if (!acc.find((e) => e.field === cur.path)) {
          return acc.concat({ message: cur.msg, field: cur.path });
        }
        return acc;
      }, [] as errorMessageType[]);
      const errors: errorsType = { errorsMessages };
      res.status(400).json(errors);
      return;
    }
    next();
  }