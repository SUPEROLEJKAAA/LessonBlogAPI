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
  authMiddleware.validate,
  postsMiddleware.input,
  errorHandler,
  postsController.create
);
postsRouter.put(
  "/:id",
  authMiddleware.validate,
  postsMiddleware.input,
  errorHandler,
  postsController.updateOneById
);
postsRouter.delete(
  "/:id",
  authMiddleware.validate,
  postsController.deleteOneById
);
