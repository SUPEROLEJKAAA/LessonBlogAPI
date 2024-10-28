import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { postsService } from "../services/posts.service";
import { paginationHelper } from "../utils/pagination.helper";
import { postsQueryRepository } from "../repositories/posts/posts.query.repostiry";
import { PostEntityDB, PostEntityInput, PostEntityResponse } from "../types/posts.type";
import { OutputPaginationType, PaginationParamType } from "../types/pagination.type";
import { ObjectId } from "mongodb";
import { commentsService } from "../services/comments.service";
import { JwtPayload } from "jsonwebtoken";
import { commentsQueryRepository } from "../repositories/comments/comments.query.repository";
import { CommentEntityDB, CommentEntityResponse } from "../types/comments.type";

export const postsController = {
  getPosts: async (req: Request, res: Response<OutputPaginationType>): Promise<void> => {
    const data: PaginationParamType = matchedData(req);
    const params: PaginationParamType = paginationHelper.mapping(data, "posts");
    const posts: OutputPaginationType = await postsQueryRepository.getPosts(params);
    res.status(200).json(posts);
  },
  create: async (req: Request, res: Response): Promise<void> => {
    const data: PostEntityInput = matchedData(req);
    const postId: string | null = await postsService.create(data);
    if (postId) {
      const post: PostEntityResponse | null = await postsQueryRepository.findOneById(postId);
      res.status(201).json(post);
      return;
    }
    res.status(400).send();
  },
  findOneById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(404).send();
      return;
    }
    const post: PostEntityResponse | null = await postsQueryRepository.findOneById(id);
    if (post) {
      res.status(200).json(post);
      return;
    }
    res.status(404).send();
  },
  updateOneById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const data: PostEntityDB = matchedData(req);
    console.log(data);
    const isUpdated: boolean = await postsService.updateOneById(id, data);
    if (isUpdated) {
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  deleteOneById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const isDeleted: boolean = await postsService.deleteOneById(id);
    if (isDeleted) {
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  createComment: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const user = req.user;
    const data: PostEntityInput = matchedData(req);
    const post: PostEntityResponse | null = await postsQueryRepository.findOneById(id);
    if (post) {
      const commentId: string | null = await commentsService.create(id, data, user as JwtPayload);
      if (commentId) {
        const comment: CommentEntityResponse | null = await commentsQueryRepository.findOneById(commentId);
        res.status(201).send(comment);
        return;
      }
    }
    res.status(404).send();
  },
  getComments: async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const post = await postsQueryRepository.findOneById(id);
    if (post) {
      const data: PaginationParamType = { ...matchedData(req), postId: id };
      const params: PaginationParamType = paginationHelper.mapping(data, "comments");
      const comments: OutputPaginationType = await commentsQueryRepository.getPosts(params);
      res.status(200).send(comments);
      return;
    }
    res.status(404).send();
  },
};
