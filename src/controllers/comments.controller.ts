import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { commentsQueryRepository } from "../repositories/comments/comments.query.repository";
import { CommentEntityResponse } from "../types/comments.type";
import { commentsService } from "../services/comments.service";

export const commentsController = {
  findById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const comment: CommentEntityResponse = await commentsQueryRepository.findOneById(id);
      res.status(200).send(comment);
    } catch (e) {
      next(e);
    }
  },
  deleteById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const payload = req.user;
      await commentsService.deleteOneById(id, payload);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
  updateById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const payload = req.user;
      const data: CommentEntityResponse = matchedData(req);
      await commentsService.updateOneById(id, payload, data);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
};
