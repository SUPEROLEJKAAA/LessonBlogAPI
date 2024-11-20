import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { blogsService } from "../services/blogs.service";
import { paginationHelper } from "../utils/pagination.helper";
import { blogsQueryRepository } from "../repositories/blogs/blogs.query.repository";
import { BlogEntityInput, BlogEntityResponse } from "../types/blogs.type";
import { OutputPaginationType, PaginationParamType } from "../types/pagination.type";
import { postsQueryRepository } from "../repositories/posts/posts.query.repostiry";
import { PostEntityInput, PostEntityResponse } from "../types/posts.type";
import { postsService } from "../services/posts.service";
import { apiError } from "../middlewares/errors.middliware";

export const blogsController = {
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: BlogEntityInput = matchedData(req);
      const blogId: string | null = await blogsService.create(data);
      const blog: BlogEntityResponse | null = await blogsQueryRepository.findOneById(blogId!);
      res.status(201).json(blog);
    } catch (e) {
      next(e);
    }
  },
  updateById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const data: BlogEntityInput = matchedData(req);
      await blogsService.updateOneById(id, data);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
  deleteById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      await blogsService.deleteOneById(id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
  getBlogs: async (req: Request, res: Response): Promise<void> => {
    const data: PaginationParamType = matchedData(req);
    const params: PaginationParamType = paginationHelper.mapping(data, "blogs");
    const blogs: OutputPaginationType = await blogsQueryRepository.getBlogs(params);
    res.status(200).json(blogs);
  },
  findById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const blog: BlogEntityResponse | null = await blogsQueryRepository.findOneById(id);
      res.status(200).json(blog);
    } catch (e) {
      next(e);
    }
  },
  createPostsByBlogId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const data: PostEntityInput = { ...matchedData(req), blogId: id };
      const postId: string = await postsService.create(data);
      const post: PostEntityResponse | null = await postsQueryRepository.findOneById(postId);
      res.status(201).send(post);
    } catch (e) {
      next(e);
    }
  },
  getPostsByBlogId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      const blog: BlogEntityResponse | null = await blogsQueryRepository.findOneById(id);
      if (blog) {
        const data = { ...(matchedData(req) as PaginationParamType), blogId: blog.id };
        const params = paginationHelper.mapping(data, "posts");
        const posts = await postsQueryRepository.getPosts(params);
        res.status(200).send(posts);
      }
      throw new apiError("Not found", 404);
    } catch (e) {
      next(e);
    }
  },
};
