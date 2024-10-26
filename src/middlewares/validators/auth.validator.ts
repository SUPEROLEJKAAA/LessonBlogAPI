import { body } from "express-validator";

export const authValidator = [
    body("loginOrEmail").trim().notEmpty().isString(),
    body("password").trim().notEmpty().isString(),
  ];