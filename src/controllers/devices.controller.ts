import { Response, Request, NextFunction } from "express";
import { apiError } from "../middlewares/errors.middliware";
import { JWTService } from "../services/jwt.service";
import { DeviceEntityResponse } from "../types/devices.type";
import { deviceQueryRepository } from "../repositories/devices/devices.query.repository";
import { devicesService } from "../services/devices.service";

export const devicesController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.user;
    const devices: DeviceEntityResponse[] = await deviceQueryRepository.getAll(payload.id);
    res.status(200).send(devices);
  },
  deleteAll: async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.user;
    await devicesService.deleteAll(payload.id, payload.deviceId!);
    res.status(204).send();
  },
  deleteByDeviceId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.user;
      const deviceId = req.params.deviceId
      await devicesService.deleteOne(payload.id, deviceId);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
};
