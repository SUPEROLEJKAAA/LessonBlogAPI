import { Router } from "express";
import { usersController } from "../controllers/users.controllers";
import { authPassMiddleware } from "../middlewares/auth.middleware";
import { errorHandler } from "../middlewares/errors.middleware";

export const authRouter = Router();

authRouter.post("/login", authPassMiddleware, errorHandler, usersController.auth);
