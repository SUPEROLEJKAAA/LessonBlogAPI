import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { postsMiddleware } from "../middlewares/posts.middleware";
import { errorHandler } from "../middlewares/errors.middleware";
import { postsController } from "../controllers/posts.controller";

export const postsRouter = Router();

postsRouter.get("/", postsController.all);
postsRouter.get("/:id", postsController.findOneById);
postsRouter.post(
  "/",
  authMiddleware,
  postsMiddleware.input,
  errorHandler,
  postsController.create
);
postsRouter.put(
  "/:id",
  authMiddleware,
  postsMiddleware.input,
  errorHandler,
  postsController.updateOneById
);
postsRouter.delete(
  "/:id",
  authMiddleware,
  postsController.deleteOneById
);
