import { NextFunction, Request, Response } from "express";
import { UserEntityAuth, UserEntityJwt, UserEntityResponse } from "../types/users.type";
import { matchedData } from "express-validator";
import { JWTService } from "../services/jwt.service";
import { authService } from "../services/auth.service";
import { usersQueryRepository } from "../repositories/users/users.query.repository";

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: UserEntityAuth = matchedData(req);
      const user: UserEntityJwt = await authService.login(data);
      const accessToken: string = JWTService.generation(user.id);
      res.status(200).send({ accessToken });
    } catch (e) {
      next(e);
    }
  },
  aboutUser: async (req: Request, res: Response): Promise<void> => {
    const payload = req.user;
    const user: UserEntityResponse = await usersQueryRepository.findOneById(payload.userId);
    const response = { email: user!.email, login: user!.login, userId: user!.id };
    res.status(200).json(response);
  },
};
