import { Router } from "express";
import { authValidator } from "../middlewares/validators/auth.validator";
import { errorHandler } from "../middlewares/errors.middleware";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/login", authValidator, errorHandler, authController.auth);
