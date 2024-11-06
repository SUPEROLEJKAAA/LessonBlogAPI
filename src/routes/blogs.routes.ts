import { Response, Request, Router, NextFunction } from "express";
import { blogsController } from "../controllers/blogs.controller";
import { blogsValidator } from "../middlewares/validators/blogs.validator";
import { authMiddleware } from "../middlewares/auth/auth.middleware";
import { validatorErrorHandler } from "../middlewares/validators/errors.validator";
import { paginationValidator } from "../middlewares/validators/pagination.validator";
import { postsValidator } from "../middlewares/validators/posts.validator";
import { ObjectIDValidator } from "../middlewares/validators/objectid.validator";

export const blogsRouter = Router();

blogsRouter.get("/", paginationValidator.blogs, blogsController.getBlogs);
blogsRouter.get("/:id", ObjectIDValidator, blogsController.findById);
blogsRouter.get(
  "/:id/posts",
  ObjectIDValidator,
  paginationValidator.posts,
  validatorErrorHandler,
  blogsController.getPostsByBlogId,
);
blogsRouter.post(
  "/:id/posts",
  authMiddleware,
  ObjectIDValidator,
  postsValidator.inputWithoutBlogId,
  validatorErrorHandler,
  blogsController.createPostsByBlogId,
);
blogsRouter.post("/", authMiddleware, blogsValidator.input, validatorErrorHandler, blogsController.create);
blogsRouter.put(
  "/:id",
  authMiddleware,
  ObjectIDValidator,
  blogsValidator.input,
  validatorErrorHandler,
  blogsController.updateById,
);
blogsRouter.delete("/:id", authMiddleware, ObjectIDValidator, blogsController.deleteById);
