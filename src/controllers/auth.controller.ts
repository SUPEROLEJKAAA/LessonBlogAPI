import { Request, Response } from "express";
import { UserEntityAuth } from "../types/users.type";
import { matchedData } from "express-validator";
import { usersService } from "../services/users.service";
import { JWTService } from "../services/jwt.service";
import { JwtPayload } from "jsonwebtoken";

export const authController = {
  login: async (req: Request, res: Response): Promise<void> => {
    const data: UserEntityAuth = matchedData(req);
    const user = await usersService.auth(data);
    if (user) {
      const accessToken = JWTService.generation(user.id, user.login, user.email);
      res.status(200).send({ accessToken });
      return;
    }
    res.status(401).send();
  },
  aboutUser: async (req: Request, res: Response): Promise<void> => {
    const user = req.user as JwtPayload;
    const response = { email: user.email, login: user.login, userId: user.id };
    res.status(200).json(response);
  },
};
