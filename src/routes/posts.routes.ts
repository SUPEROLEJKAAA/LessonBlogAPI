import { Router } from "express";
import { postsController } from "../controllers/posts.controller";
import { authMiddleware } from "../middlewares/auth/auth.middleware";
import { postsValidator } from "../middlewares/validators/posts.validator";
import { errorHandler } from "../middlewares/errors.middleware";
import { paginationValidator } from "../middlewares/validators/pagination.validator";
import { ObjectIDValidator } from "../middlewares/validators/objectid.validator";
import { JWTMiddleware } from "../middlewares/auth/jwt.middleware";
import { commentsValidator } from "../middlewares/validators/comments.validator";

export const postsRouter = Router();

postsRouter.get("/", paginationValidator.posts, postsController.getPosts);
postsRouter.get("/:id", ObjectIDValidator, postsController.findOneById);
postsRouter.get(
  "/:id/comments",
  ObjectIDValidator,
  paginationValidator.comments,
  errorHandler,
  postsController.getComments,
);
postsRouter.post("/", authMiddleware, postsValidator.inputData, errorHandler, postsController.create);
postsRouter.post(
  "/:id/comments",
  JWTMiddleware,
  ObjectIDValidator,
  commentsValidator.input,
  errorHandler,
  postsController.createComment,
);
postsRouter.put(
  "/:id",
  authMiddleware,
  ObjectIDValidator,
  postsValidator.inputData,
  errorHandler,
  postsController.updateOneById,
);
postsRouter.delete("/:id", authMiddleware, ObjectIDValidator, postsController.deleteOneById);