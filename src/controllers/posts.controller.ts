import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { postsService } from "../services/posts.service";
import { commentsService } from "../services/comments.service";
import { paginationHelper } from "../utils/pagination.helper";
import { postsQueryRepository } from "../repositories/posts/posts.query.repostiry";
import { commentsQueryRepository } from "../repositories/comments/comments.query.repository";
import { PostEntityDB, PostEntityInput, PostEntityResponse } from "../types/posts.type";
import { OutputPaginationType, PaginationParamType } from "../types/pagination.type";
import { CommentEntityResponse } from "../types/comments.type";
import { postsCommandRepository } from "../repositories/posts/posts.command.repository";
import { apiError } from "../middlewares/errors.middliware";

export const postsController = {
  getPosts: async (req: Request, res: Response): Promise<void> => {
    const data: PaginationParamType = matchedData(req);
    const params: PaginationParamType = paginationHelper.mapping(data, "posts");
    const posts: OutputPaginationType = await postsQueryRepository.getPosts(params);
    res.status(200).json(posts);
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: PostEntityInput = matchedData(req);
      const postId: string = await postsService.create(data);
      const post: PostEntityResponse | null = await postsQueryRepository.findOneById(postId);
      res.status(201).json(post);
    } catch (e) {
      next(e);
    }
  },
  findOneById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const post: PostEntityResponse | null = await postsQueryRepository.findOneById(id);
      res.status(200).json(post);
    } catch (e) {
      next(e);
    }
  },
  updateOneById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const data: PostEntityDB = matchedData(req);
      await postsService.updateOneById(id, data);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
  deleteOneById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      await postsService.deleteOneById(id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
  createComment: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const payload = req.user;
      const data: PostEntityInput = matchedData(req);
      const commentId: string = await commentsService.create(id, data, payload.id);
      const comment: CommentEntityResponse | null = await commentsQueryRepository.findOneById(commentId);
      res.status(201).send(comment);
    } catch (e) {
      next(e);
    }
  },
  getComments: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const post = await postsCommandRepository.findOneById(id);
      if (!post) {
        throw new apiError("Not found post", 404);
      }
      const data: PaginationParamType = { ...matchedData(req), postId: id };
      const params: PaginationParamType = paginationHelper.mapping(data, "comments");
      const comments: OutputPaginationType = await commentsQueryRepository.getPosts(params);
      res.status(200).send(comments);
    } catch (e) {
      next(e);
    }
  },
};
