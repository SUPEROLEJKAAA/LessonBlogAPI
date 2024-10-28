import { Router } from "express";
import { ObjectIDValidator } from "../middlewares/validators/objectid.validator";
import { commentsController } from "../controllers/comments.controller";
import { JWTMiddleware } from "../middlewares/auth/jwt.middleware";
import { commentsValidator } from "../middlewares/validators/comments.validator";
import { errorHandler } from "../middlewares/errors.middleware";

export const commentsRouter = Router();

commentsRouter.get("/:id", ObjectIDValidator, commentsController.findById);
commentsRouter.put(
  "/:id",
  JWTMiddleware,
  ObjectIDValidator,
  commentsValidator.input,
  errorHandler,
  commentsController.updateById,
);
commentsRouter.delete("/:id", JWTMiddleware, ObjectIDValidator, commentsController.deleteById);
