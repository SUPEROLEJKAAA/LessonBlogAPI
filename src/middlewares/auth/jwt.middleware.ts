import { Request, Response, NextFunction } from "express";
import { JWTService, Payload } from "../../services/jwt.service";
import { devicesCommandRepository } from "../../repositories/devices/devices.command.repository";

export const JWTMiddleware = {
  access: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization?.split(" ")[1];
        const payload = JWTService.verifyAccess(token);
        req.user = payload;
        next();
        return;
      }
      throw new Error();
    } catch (e) {
      res.status(401).send();
      return;
    }
  },
  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.cookies.refreshToken) {
        const token = req.cookies.refreshToken;
        const payload: Payload = JWTService.verifyRefresh(token);
        const device = await devicesCommandRepository.findByUserAndDeviceId(payload.id, payload.deviceId);
        if (!device || device.lastActiveDate !== payload.iat) {
          throw new Error();
        }
        req.user = payload;
        next();
        return;
      }
      throw new Error();
    } catch (e) {
      res.status(401).send();
      return;
    }
  },
};
