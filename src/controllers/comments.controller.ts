import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { JwtPayload } from "jsonwebtoken";
import { commentsQueryRepository } from "../repositories/comments/comments.query.repository";
import { commentsCommandRepository } from "../repositories/comments/comments.command.repository";
import { CommentEntityResponse } from "../types/comments.type";

export const commentsController = {
  findById: async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const comment: CommentEntityResponse | null = await commentsQueryRepository.findOneById(id);
    if (comment) {
      res.status(200).send(comment);
      return;
    }
    res.status(404).send();
  },
  deleteById: async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const user = req.user as JwtPayload;
    const comment: CommentEntityResponse | null = await commentsQueryRepository.findOneById(id);
    if (comment) {
      if (comment.commentatorInfo.userId != user.id) {
        res.status(403).send();
        return;
      }
      await commentsCommandRepository.deleteOneById(id);
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  updateById: async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const user = req.user as JwtPayload;
    const data: CommentEntityResponse = matchedData(req);
    const comment: CommentEntityResponse | null = await commentsQueryRepository.findOneById(id);
    if (comment) {
      if (comment.commentatorInfo.userId != user.id) {
        res.status(403).send();
        return;
      }
      await commentsCommandRepository.updateOneById(id, data);
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
};
