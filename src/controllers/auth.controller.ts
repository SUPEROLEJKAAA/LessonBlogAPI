import { NextFunction, Request, Response } from "express";
import { UserEntityAuth, UserEntityDB, UserEntityInput, UserEntityJwt, UserEntityResponse } from "../types/users.type";
import { matchedData } from "express-validator";
import { JWTService } from "../services/jwt.service";
import { authService } from "../services/auth.service";
import { usersCommandRepository } from "../repositories/users/users.command.repository";
import { tokensService } from "../services/tokens.service";

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: UserEntityAuth = matchedData(req);
      const user: UserEntityJwt = await authService.login(data);
      const accessToken: string = await JWTService.generation(user.id, "10s");
      const refreshToken: string = await JWTService.generation(user.id, "20s");
      res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
      res.status(200).send({ accessToken });
    } catch (e) {
      next(e);
    }
  },
  refreshToken: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token: string = req.cookies.refreshToken;
      const payload = JWTService.verify(token);
      await tokensService.checkTokenBlackList(token);
      await tokensService.addTokenBlackList(token);
      const accessToken: string = JWTService.generation(payload.id, "10s");
      const refreshToken: string = JWTService.generation(payload.id, "20s");
      res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
      res.status(200).send({ accessToken });
    } catch (e) {
      next(e);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token: string = req.cookies.refreshToken;
      JWTService.verify(token);
      await tokensService.checkTokenBlackList(token);
      await tokensService.addTokenBlackList(token);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
  aboutUser: async (req: Request, res: Response): Promise<void> => {
    const payload = req.user;
    const user: UserEntityDB | null = await usersCommandRepository.findOneById(payload.id);
    if (user) {
      const response = { email: user.email, login: user.login, userId: user._id };
      res.status(200).json(response);
      return;
    }
    res.status(401).send();
  },
  registration: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: UserEntityInput = matchedData(req);
      await authService.registration(data);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
  registraionConfrimation: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = matchedData(req);
      await authService.registraionConfirm(data.code);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
  resendEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = matchedData(req);
      await authService.resendEmail(data.email);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
};
