import { Request, Response } from "express";
import { clear } from "../db/db";

export const testsController = {
  clear: (req: Request, res: Response): void => {
    clear();
    res.status(204).send();
  },
};
