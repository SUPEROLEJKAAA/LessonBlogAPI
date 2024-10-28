import { Router } from "express";
import { authValidator } from "../middlewares/validators/auth.validator";
import { errorHandler } from "../middlewares/errors.middleware";
import { authController } from "../controllers/auth.controller";
import { JWTMiddleware } from "../middlewares/auth/jwt.middleware";

export const authRouter = Router();

authRouter.post("/login", authValidator, errorHandler, authController.login);
authRouter.get("/me", JWTMiddleware, authController.aboutUser);
