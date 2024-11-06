import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth/auth.middleware";
import { paginationValidator } from "../middlewares/validators/pagination.validator";
import { usersValidator } from "../middlewares/validators/users.validator";
import { ObjectIDValidator } from "../middlewares/validators/objectid.validator";
import { validatorErrorHandler } from "../middlewares/validators/errors.validator";

export const usersRouter = Router();

usersRouter.get("/", authMiddleware, paginationValidator.users, usersController.getUsers);
usersRouter.post("/", authMiddleware, usersValidator.input, validatorErrorHandler, usersController.create);
usersRouter.delete("/:id", authMiddleware, ObjectIDValidator, usersController.delete);
