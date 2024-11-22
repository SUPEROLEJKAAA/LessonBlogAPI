import { body } from "express-validator";

export const authValidator = {
  login: [body("loginOrEmail").trim().notEmpty().isString(), body("password").trim().notEmpty().isString()],
  registationConfirmation: body("code").trim().isString().isUUID(),
  resend: body("email").trim().isString().isEmail(),
  recoveryPassword: body("email").trim().isString().isEmail(),
  newPassword: [
    body("newPassword").trim().isString().isLength({ min: 6, max: 20 }),
    body("recoveryCode").trim().isUUID(),
  ],
};
