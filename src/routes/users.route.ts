import { Router } from "express";
import { usersController } from "../controllers/users.controllers";
import { authMiddleware } from "../middlewares/auth/auth.middleware";
import { paginationValidator } from "../middlewares/validators/pagination.validator";
import { usersValidator } from "../middlewares/validators/users.validator";
import { ObjectIDValidator } from "../middlewares/validators/objectid.validator";
import { errorHandler } from "../middlewares/errors.middleware";

export const usersRouter = Router();

usersRouter.get("/", authMiddleware, paginationValidator.users, usersController.getUsers);
usersRouter.post("/", authMiddleware, usersValidator.input, errorHandler, usersController.create);
usersRouter.delete("/:id", authMiddleware, ObjectIDValidator, usersController.delete);
