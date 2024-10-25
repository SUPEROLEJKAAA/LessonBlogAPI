import { body } from "express-validator";

export const usersMiddleware = {
  input: [
    body("login")
      .trim()
      .notEmpty()
      .withMessage("login must be non-empty ")
      .isString()
      .withMessage("login must be string")
      .isLength({ min: 3, max: 10 })
      .withMessage("The length should be between 3 and 10 characters"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email must be non-empty")
      .isString()
      .withMessage("email must be string")
      .isEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("email must be non-empty")
      .isString()
      .withMessage("email must be string")
      .isLength({ min: 6, max: 20 })
      .withMessage("The length should be between 3 and 10 characters"),
  ],
};
