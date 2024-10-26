import { body } from "express-validator";
import { BlogEntityResponse } from "../../types/blogs.type";
import { blogsQueryRepository } from "../../repositories/blogs/blogs.query.repository";

export const postsValidator = {
  inputData: [
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
        const blog: BlogEntityResponse | null = await blogsQueryRepository.findOneById(id);
        if (!blog) {
          throw new Error("invalid blogId field");
        }
      }),
  ],
  inputWithoutBlogId: [
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
  ],
};
