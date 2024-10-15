import { Router } from "express";
import { blogsController } from "../controllers/blogs.controller";
import { blogsMiddleware } from "../middlewares/blogs.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { errorHandler } from "../middlewares/errors.middleware";

export const blogsRouter = Router();

blogsRouter.get("/", blogsController.all);
blogsRouter.get("/:id", blogsController.findById);
blogsRouter.post(
  "/",
  authMiddleware,
  blogsMiddleware.input,
  errorHandler,
  blogsController.create
);
blogsRouter.put(
  "/:id",
  authMiddleware,
  blogsMiddleware.input,
  errorHandler,
  blogsController.updateById
);
blogsRouter.delete("/:id", authMiddleware, blogsController.deleteOneById);
