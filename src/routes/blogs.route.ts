import { Router } from "express";
import { blogsController } from "../controllers/blogs.controller";
import { blogsValidator } from "../middlewares/validators/blogs.validator";
import { authMiddleware } from "../middlewares/auth/auth.middleware";
import { errorHandler } from "../middlewares/errors.middleware";
import { postsController } from "../controllers/posts.controller";
import { paginationValidator } from "../middlewares/validators/pagination.validator";
import { postsValidator } from "../middlewares/validators/posts.validator";
import { ObjectIDValidator } from "../middlewares/validators/objectid.validator";

export const blogsRouter = Router();

blogsRouter.get("/", paginationValidator.blogs, blogsController.getBlogs);
blogsRouter.get("/:id", ObjectIDValidator, blogsController.findById);
blogsRouter.get("/:id/posts", paginationValidator.posts, ObjectIDValidator, postsController.getPostsByBlogId);
blogsRouter.post(
  "/:id/posts",
  authMiddleware,
  postsValidator.inputWithoutBlogId,
  errorHandler,
  postsController.createPostsByBlogId,
);
blogsRouter.post("/", authMiddleware, blogsValidator.input, errorHandler, blogsController.create);
blogsRouter.put("/:id", authMiddleware, blogsValidator.input, errorHandler, ObjectIDValidator, blogsController.updateById);
blogsRouter.delete("/:id", authMiddleware, ObjectIDValidator, blogsController.deleteById);