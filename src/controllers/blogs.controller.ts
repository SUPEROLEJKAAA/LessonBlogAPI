import { Request, Response } from "express";
import { blogsReposity } from "../repositories/blogs.repository";
import { inputBlogType, outputBlogType } from "../types/blogs.type";
import { matchedData } from "express-validator";
import { ObjectId } from "mongodb";

export const blogsController = {
  all: async (req: Request, res: Response<outputBlogType[]>): Promise<void> => {
    const blogs: outputBlogType[] = await blogsReposity.all();
    res.status(200).json(blogs);
  },
  findById: async (
    req: Request,
    res: Response<outputBlogType>
  ): Promise<void> => {
    const id: string = req.params.id;
    const blog: outputBlogType | null = await blogsReposity.findOneById(id);
    if (blog) {
      res.status(200).json(blog);
      return;
    }
    res.status(404).send();
  },
  create: async (
    req: Request<any, any, inputBlogType>,
    res: Response<outputBlogType | any>
  ): Promise<void> => {
    const data: inputBlogType = matchedData(req);
    const blog: outputBlogType | null = await blogsReposity.create(data);
    res.status(201).json(blog);
  },
  updateById: async (
    req: Request<any, any, inputBlogType>,
    res: Response<outputBlogType>
  ): Promise<void> => {
    const data: inputBlogType = matchedData(req);
    const id: string = req.params.id;
    const blog: outputBlogType | null = await blogsReposity.findOneById(id);
    if (blog) {
      await blogsReposity.updateOneById(blog.id, data);
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  deleteById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const blog: outputBlogType | null = await blogsReposity.findOneById(id);
    if (blog) {
      await blogsReposity.deleteOneById(blog.id);
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
};
