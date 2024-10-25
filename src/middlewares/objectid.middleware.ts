import { Response, Request, NextFunction } from "express";
import { ObjectId } from "mongodb";

export const ObjectIDMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send();
    return;
  }
  next();
};
