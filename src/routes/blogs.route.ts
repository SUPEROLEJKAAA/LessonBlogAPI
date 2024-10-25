import { Router } from "express";
import { blogsController } from "../controllers/blogs.controller";
import { blogsMiddleware } from "../middlewares/blogs.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { errorHandler } from "../middlewares/errors.middleware";
import { postsController } from "../controllers/posts.controller";
import { paginationMiddleware } from "../middlewares/pagination.middleware";
import { postsMiddleware } from "../middlewares/posts.middleware";
import { ObjectIDMiddleware } from "../middlewares/objectid.middleware";

export const blogsRouter = Router();

blogsRouter.get("/", paginationMiddleware.blogs, blogsController.getBlogs);
blogsRouter.get("/:id", ObjectIDMiddleware, blogsController.findById);
blogsRouter.get("/:id/posts", paginationMiddleware.posts, ObjectIDMiddleware, postsController.getPostsByBlogId);
blogsRouter.post(
  "/:id/posts",
  authMiddleware,
  postsMiddleware.inputWithoutBlogId,
  errorHandler,
  postsController.createPostsByBlogId,
);
blogsRouter.post("/", authMiddleware, blogsMiddleware.input, errorHandler, blogsController.create);
blogsRouter.put("/:id", authMiddleware, blogsMiddleware.input, errorHandler, ObjectIDMiddleware, blogsController.updateById);
blogsRouter.delete("/:id", authMiddleware, ObjectIDMiddleware, blogsController.deleteById);