import { Router } from "express";
import { postsController } from "../controllers/posts.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { postsMiddleware } from "../middlewares/posts.middleware";
import { errorHandler } from "../middlewares/errors.middleware";
import { paginationMiddleware } from "../middlewares/pagination.middleware";
import { ObjectIDMiddleware } from "../middlewares/objectid.middleware";

export const postsRouter = Router();

postsRouter.get("/", paginationMiddleware.posts, postsController.getPosts);
postsRouter.get("/:id", ObjectIDMiddleware, postsController.findOneById);
postsRouter.post("/", authMiddleware, postsMiddleware.inputData, errorHandler, postsController.create);
postsRouter.put(
  "/:id",
  authMiddleware,
  postsMiddleware.inputData,
  errorHandler,
  ObjectIDMiddleware,
  postsController.updateOneById,
);
postsRouter.delete("/:id", authMiddleware, ObjectIDMiddleware, postsController.deleteOneById);
