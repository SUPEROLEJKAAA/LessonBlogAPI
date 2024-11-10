import { body } from "express-validator";

export const authValidator = {
  login: [body("loginOrEmail").trim().notEmpty().isString(), body("password").trim().notEmpty().isString()],
  registationConfirmation: body("code").trim().isString().isUUID(),
  resend: body("email").trim().isString().isEmail(),
};
