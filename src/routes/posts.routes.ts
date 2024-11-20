import { Router } from "express";
import { postsController } from "../controllers/posts.controller";
import { authMiddleware } from "../middlewares/auth/auth.middleware";
import { postsValidator } from "../middlewares/validators/posts.validator";
import { validatorErrorHandler } from "../middlewares/validators/errors.validator";
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
  validatorErrorHandler,
  postsController.getComments,
);
postsRouter.post("/", authMiddleware, postsValidator.inputData, validatorErrorHandler, postsController.create);
postsRouter.post(
  "/:id/comments",
  JWTMiddleware.access,
  ObjectIDValidator,
  commentsValidator.input,
  validatorErrorHandler,
  postsController.createComment,
);
postsRouter.put(
  "/:id",
  authMiddleware,
  ObjectIDValidator,
  postsValidator.inputData,
  validatorErrorHandler,
  postsController.updateOneById,
);
postsRouter.delete("/:id", authMiddleware, ObjectIDValidator, postsController.deleteOneById);
