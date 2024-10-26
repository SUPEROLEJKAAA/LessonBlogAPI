import { body } from "express-validator";

export const blogsValidator = {
  input: [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ max: 15 })
      .withMessage("max length is 15"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("description is required")
      .isLength({ max: 500 })
      .withMessage("max length is 500"),
    body("websiteUrl")
      .trim()
      .notEmpty()
      .withMessage("websiteUrl is required")
      .isURL()
      .withMessage("should be url")
      .isLength({ max: 100 })
      .withMessage("max length is 100"),
  ],
};
