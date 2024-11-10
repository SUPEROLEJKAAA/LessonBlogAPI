import { Router } from "express";
import { authValidator } from "../middlewares/validators/auth.validator";
import { validatorErrorHandler } from "../middlewares/validators/errors.validator";
import { authController } from "../controllers/auth.controller";
import { JWTMiddleware } from "../middlewares/auth/jwt.middleware";
import { usersValidator } from "../middlewares/validators/users.validator";

export const authRouter = Router();
authRouter.get("/me", JWTMiddleware, authController.aboutUser);
authRouter.post("/login", authValidator.login, validatorErrorHandler, authController.login);
authRouter.post("/registration", usersValidator.input, validatorErrorHandler, authController.registration);
authRouter.post(
  "/registration-confirmation",
  authValidator.registationConfirmation,
  validatorErrorHandler,
  authController.registraionConfrimation,
);
authRouter.post(
  "/registration-email-resending",
  authValidator.resend,
  validatorErrorHandler,
  authController.resendEmail,
);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/logout", authController.logout);