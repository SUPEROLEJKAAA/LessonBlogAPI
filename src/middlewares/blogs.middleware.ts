import {
  body,
  param,
} from "express-validator";

export const blogsMiddleware = {
  input: [
    body("name").not().isEmpty().withMessage("name is required"),
    body("name").trim().isLength({ max: 15 }).withMessage("max length is 15"),
    body("description").not().isEmpty().withMessage("description is required"),
    body("description")
      .trim()
      .isLength({ max: 500 })
      .withMessage("max length is 500"),
    body("websiteUrl").not().isEmpty().withMessage("websiteUrl is required"),
    body("websiteUrl").trim().isURL().withMessage("should be url"),
    body("websiteUrl")
      .trim()
      .isLength({ max: 100 })
      .withMessage("max length is 100"),
  ],
  // id: [
  //   param("id").trim().not().isEmpty().withMessage("id is required"),
  //   param("id")
  //     .trim()
  //     .isUUID()
  //     .withMessage("the ID must be 36 characters long"),
  // ],
};
