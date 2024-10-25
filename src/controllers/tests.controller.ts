import { Request, Response } from "express";
import { blogsCollection, postsCollection, usersCollection } from "../db/collections";

export const testsController = {
  clear: (req: Request, res: Response): void => {
    postsCollection.drop();
    blogsCollection.drop();
    usersCollection.drop();
    res.status(204).send();
  },
};
