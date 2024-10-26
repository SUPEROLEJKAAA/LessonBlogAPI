import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { postsService } from "../services/posts.service";
import { paginationHelper } from "../utils/pagination.helper";
import { blogsQueryRepository } from "../repositories/blogs/blogs.query.repository";
import { postsQueryRepository } from "../repositories/posts/posts.query.repostiry";
import { PostEntityDB, PostEntityInput, PostEntityResponse } from "../types/posts.type";
import { OutputPaginationType, PaginationParamType } from "../types/pagination.type";
import { BlogEntityResponse } from "../types/blogs.type";
import { ObjectId } from "mongodb";

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
    if(!ObjectId.isValid(id)) {
      res.status(404).send()
      return
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
    if(!ObjectId.isValid(id)) {
      res.status(404).send()
      return
    }
    const data: PostEntityDB = matchedData(req);
    const isUpdated: boolean = await postsService.updateOneById(id, data);
    if (isUpdated) {
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  deleteOneById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    if(!ObjectId.isValid(id)) {
      res.status(404).send()
      return
    }
    const isDeleted: boolean = await postsService.deleteOneById(id);
    if (isDeleted) {
      res.status(204).send();
      return;
    }
    res.status(404).send();
  }
};
