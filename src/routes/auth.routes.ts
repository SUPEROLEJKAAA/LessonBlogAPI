import { Router } from "express";
import { authValidator } from "../middlewares/validators/auth.validator";
import { validatorErrorHandler } from "../middlewares/validators/errors.validator";
import { authController } from "../controllers/auth.controller";
import { JWTMiddleware } from "../middlewares/auth/jwt.middleware";

export const authRouter = Router();

authRouter.post("/login", authValidator, validatorErrorHandler, authController.login);
authRouter.get("/me", JWTMiddleware, authController.aboutUser);
