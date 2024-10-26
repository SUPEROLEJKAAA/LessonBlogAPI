import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { blogsService } from "../services/blogs.service";
import { paginationHelper } from "../utils/pagination.helper";
import { blogsQueryRepository } from "../repositories/blogs/blogs.query.repository";
import { BlogEntityInput, BlogEntityResponse } from "../types/blogs.type";
import { OutputPaginationType, PaginationParamType } from "../types/pagination.type";
import { postsQueryRepository } from "../repositories/posts/posts.query.repostiry";
import { PostEntityInput, PostEntityResponse } from "../types/posts.type";
import { postsService } from "../services/posts.service";

export const blogsController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const data: BlogEntityInput = matchedData(req);
    const blogId: string | null = await blogsService.create(data);
    const blog: BlogEntityResponse | null = await blogsQueryRepository.findOneById(blogId!);
    res.status(201).json(blog);
  },
  updateById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const data: BlogEntityInput = matchedData(req);
    const isUpdated: boolean = await blogsService.updateOneById(id, data);
    if (isUpdated) {
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  deleteById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const isDeleted: boolean = await blogsService.deleteOneById(id);
    if (isDeleted) {
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  getBlogs: async (req: Request, res: Response): Promise<void> => {
    const data: PaginationParamType = matchedData(req);
    const params: PaginationParamType = paginationHelper.mapping(data, "blogs");
    const blogs: OutputPaginationType = await blogsQueryRepository.getBlogs(params);
    res.status(200).json(blogs);
  },
  findById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const blog: BlogEntityResponse | null = await blogsQueryRepository.findOneById(id);
    if (blog) {
      res.status(200).json(blog);
      return;
    }
    res.status(404).send();
  },
  createPostsByBlogId: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const data: PostEntityInput = { ...matchedData(req), blogId: id };
    const postId: string | null = await postsService.create(data);
    if (postId) {
      const post: PostEntityResponse | null = await postsQueryRepository.findOneById(postId);
      res.status(201).send(post);
      return;
    }
    res.status(404).send();
  },
  getPostsByBlogId: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const blog: BlogEntityResponse | null = await blogsQueryRepository.findOneById(id);
    if (!blog) {
      res.status(404).send();
      return;
    }
    const data = { ...(matchedData(req) as PaginationParamType), blogId: blog.id };
    const params = paginationHelper.mapping(data, "posts");
    const posts = await postsQueryRepository.getPosts(params);
    res.status(200).send(posts);
  },
};
