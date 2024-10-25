import { Router } from "express";
import { usersController } from "../controllers/users.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { paginationMiddleware } from "../middlewares/pagination.middleware";
import { usersMiddleware } from "../middlewares/users.middleware";
import { ObjectIDMiddleware } from "../middlewares/objectid.middleware";
import { errorHandler } from "../middlewares/errors.middleware";

export const usersRouter = Router();

usersRouter.get("/", authMiddleware, paginationMiddleware.users, usersController.getUsers);
usersRouter.post("/", authMiddleware, usersMiddleware.input, errorHandler, usersController.create);
usersRouter.delete("/:id", authMiddleware, ObjectIDMiddleware, usersController.delete);
