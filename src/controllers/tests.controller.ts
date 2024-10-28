import { Request, Response } from "express";
import { blogsCollection, commentsCollection, postsCollection, usersCollection } from "../db/collections";

export const testsController = {
  clear: (req: Request, res: Response): void => {
    postsCollection.drop();
    blogsCollection.drop();
    usersCollection.drop();
    commentsCollection.drop();
    res.status(204).send();
  },
};
