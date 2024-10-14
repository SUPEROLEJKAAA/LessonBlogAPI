import { Router } from "express";
import { testsController } from "../controllers/tests.controller";

export const testsRouter = Router();

testsRouter.delete("/all-data", testsController.clear);
