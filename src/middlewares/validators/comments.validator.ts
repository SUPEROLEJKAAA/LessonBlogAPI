import { body } from "express-validator";

export const commentsValidator = {
  input: [body("content").trim().notEmpty().isString().isLength({ min: 20, max: 300 })],
};
