import { Response, Request, NextFunction } from "express";

export const authMiddleware =  (req: Request, res: Response, next: NextFunction) => {
    const data: string = "admin:qwerty"
    const validToken: string = Buffer.from(data).toString("base64");
    const tokenField: string | undefined = req.headers.authorization;
    if (tokenField) {
      const [ type, token ] = tokenField.split(" ")
      if (token === validToken && type === "Basic") {
        next();
        return;
      }
    }
    res.status(401).send();
  }
