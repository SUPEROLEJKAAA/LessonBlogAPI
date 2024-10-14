import { Response, Request, NextFunction } from "express";

export const authMiddleware = {
  validate: (req: Request, res: Response, next: NextFunction) => {
    const data: string = "admin:qwerty";
    const goodToken: string = Buffer.from(data).toString("base64");
    const tokenField: string | undefined = req.headers.authorization;
    if (tokenField) {
      const token: string = tokenField.split(" ")[1];
      if (token === goodToken) {
        next();
        return
      }
    }
    res.status(401).send();
  },
};
