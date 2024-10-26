import { Router } from "express";
import { usersController } from "../controllers/users.controllers";
import { authValidator } from "../middlewares/validators/auth.validator";
import { errorHandler } from "../middlewares/errors.middleware";

export const authRouter = Router();

authRouter.post("/login", authValidator, errorHandler, usersController.auth);
