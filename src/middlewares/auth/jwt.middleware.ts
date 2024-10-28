import { Request, Response, NextFunction } from "express";
import { JWTService } from "../../services/jwt.service";

export const JWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization?.split(" ")[1];
      const payload = JWTService.verify(token);
      req.user = payload;
      next();
      return
    }
    throw new Error();
  } catch (e) {
    res.status(401).send();
    return;
  }
};
