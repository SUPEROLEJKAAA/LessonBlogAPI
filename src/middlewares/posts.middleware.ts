import { body } from "express-validator";
import { blogsReposity } from "../repositories/blogs.repository";
import { outputBlogType } from "../types/blogs.type";

export const postsMiddleware = {
  input: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("title is required")
      .isLength({ max: 30 })
      .withMessage("max length is 30"),
    body("shortDescription")
      .trim()
      .notEmpty()
      .withMessage("shortDescription is required")
      .isLength({ max: 100 })
      .withMessage("max length is 100"),
    body("content")
      .trim()
      .notEmpty()
      .withMessage("content is required")
      .isLength({ max: 1000 })
      .withMessage("max length is 1000"),
    body("blogId")
      .trim()
      .custom(async (id: string) => {
        const blog: outputBlogType | null = await blogsReposity.findOneById(id);
        if (!blog) {
          throw new Error("invalid blogId field");
        }
      })
  ],
};