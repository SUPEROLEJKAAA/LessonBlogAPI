import { body } from "express-validator";
import { blogsReposity } from "../repositories/blogs.repository";
import { outputBlogType } from "../types/blogs.type";

export const postsMiddleware = {
  input: [
    body("title").trim().not().isEmpty().withMessage("title is required"),
    body("title").trim().isLength({ max: 30 }).withMessage("max length is 30"),
    body("shortDescription")
      .trim()
      .not()
      .isEmpty()
      .withMessage("shortDescription is required"),
    body("shortDescription")
      .trim()
      .isLength({ max: 100 })
      .withMessage("max length is 100"),
    body("content").trim().not().isEmpty().withMessage("content is required"),
    body("content")
      .trim()
      .isLength({ max: 1000 })
      .withMessage("max length is 1000"),
    body("blogId")
      .trim()
      .custom((id: string) => {
        const blog: outputBlogType | undefined = blogsReposity.findOneById(id);
        if (blog) {
          return true
        };
        return false;
      })
      .withMessage("Invalid blogId field"),
  ],
};
