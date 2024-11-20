import { Router } from "express";
import { authValidator } from "../middlewares/validators/auth.validator";
import { validatorErrorHandler } from "../middlewares/validators/errors.validator";
import { authController } from "../controllers/auth.controller";
import { JWTMiddleware } from "../middlewares/auth/jwt.middleware";
import { usersValidator } from "../middlewares/validators/users.validator";
import { rateLimit } from "../middlewares/rateLimit.middleware";

export const authRouter = Router();
authRouter.get("/me", JWTMiddleware.access, authController.aboutUser);
authRouter.post("/login", rateLimit, authValidator.login, validatorErrorHandler, authController.login);
authRouter.post("/registration", rateLimit, usersValidator.input, validatorErrorHandler, authController.registration);
authRouter.post(
  "/registration-confirmation",
  rateLimit,
  authValidator.registationConfirmation,
  validatorErrorHandler,
  authController.registraionConfrimation,
);
authRouter.post(
  "/registration-email-resending",
  rateLimit,
  authValidator.resend,
  validatorErrorHandler,
  authController.resendEmail,
);
authRouter.post("/refresh-token", JWTMiddleware.refresh, authController.refreshToken);
authRouter.post("/logout", JWTMiddleware.refresh, authController.logout);
