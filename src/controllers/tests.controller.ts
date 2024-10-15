import { Request, Response } from "express";
import { blogsCollection, postsCollection } from "../db/collections";

export const testsController = {
  clear: (req: Request, res: Response): void => {
    postsCollection.drop()
    blogsCollection.drop()
    res.status(204).send();
  },
};
