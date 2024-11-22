import { NextFunction, Request, Response } from "express";
import { UserEntityAuth, UserEntityDB, UserEntityInput } from "../types/users.type";
import { matchedData } from "express-validator";
import { authService } from "../services/auth.service";
import { usersCommandRepository } from "../repositories/users/users.command.repository";
import { browserHelper } from "../utils/browser.helper";
import { devicesService } from "../services/devices.service";

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: UserEntityAuth = matchedData(req);
      const browser = browserHelper(req);
      const jwt = await authService.login(data, browser);
      res.cookie("refreshToken", jwt.refreshToken, { httpOnly: true, secure: true, sameSite: "lax" });
      res.status(200).send({ accessToken: jwt.accessToken });
    } catch (e) {
      next(e);
    }
  },
  refreshToken: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.user;
      const browser = browserHelper(req);
      const jwt = await authService.refreshToken(payload, browser);
      res.cookie("refreshToken", jwt.refreshToken, { httpOnly: true, secure: true, sameSite: "lax" });
      res.status(200).send({ accessToken: jwt.accessToken });
    } catch (e) {
      next(e);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.user;
      await devicesService.deleteOne(payload.id, payload.deviceId!);
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
  recoveryPassword: async (req: Request, res: Response, next: NextFunction) => {
    const data = matchedData(req);
    await authService.recoveryPassword(data.email);
    res.status(204).send();
  },
  newPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = matchedData(req);
      await authService.newPassword(data);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
};
