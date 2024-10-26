import { Router } from "express";
import { postsController } from "../controllers/posts.controller";
import { authMiddleware } from "../middlewares/auth/auth.middleware";
import { postsValidator } from "../middlewares/validators/posts.validator";
import { errorHandler } from "../middlewares/errors.middleware";
import { paginationValidator } from "../middlewares/validators/pagination.validator";
import { ObjectIDValidator } from "../middlewares/validators/objectid.validator";

export const postsRouter = Router();

postsRouter.get("/", paginationValidator.posts, postsController.getPosts);
postsRouter.get("/:id", ObjectIDValidator, postsController.findOneById);
postsRouter.post("/", authMiddleware, postsValidator.inputData, errorHandler, postsController.create);
postsRouter.put(
  "/:id",
  authMiddleware,
  postsValidator.inputData,
  errorHandler,
  ObjectIDValidator,
  postsController.updateOneById,
);
postsRouter.delete("/:id", authMiddleware, ObjectIDValidator, postsController.deleteOneById);
