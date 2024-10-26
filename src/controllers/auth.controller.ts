import { Request, Response } from "express";
import { UserEntityAuth } from "../types/users.type";
import { matchedData } from "express-validator";
import { usersService } from "../services/users.service";

export const authController = {
    auth: async (req: Request, res: Response) => {
        const data: UserEntityAuth = matchedData(req);
        const result = await usersService.auth(data);
        if (result) {
          res.status(204).send();
          return;
        }
        res.status(401).send();
      }
}
