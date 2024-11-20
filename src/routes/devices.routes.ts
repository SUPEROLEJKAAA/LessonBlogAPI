import { Router } from "express";
import { devicesController } from "../controllers/devices.controller";
import { JWTMiddleware } from "../middlewares/auth/jwt.middleware";

export const devicesRouter = Router();

devicesRouter.get("/devices", JWTMiddleware.refresh, devicesController.getAll);
devicesRouter.delete("/devices", JWTMiddleware.refresh, devicesController.deleteAll);
devicesRouter.delete("/devices/:deviceId", JWTMiddleware.refresh, devicesController.deleteByDeviceId);
