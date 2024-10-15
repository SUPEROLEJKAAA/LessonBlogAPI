import { Request, Response } from "express";
import { blogsReposity } from "../repositories/blogs.repository";
import { inputBlogType, outputBlogType } from "../types/blogs.type";
import { matchedData } from "express-validator";

export const blogsController = {
  all: (req: Request, res: Response<outputBlogType[]>): void => {
    const blogs: outputBlogType[] = blogsReposity.all();
    res.status(200).json(blogs);
  },
  findById: (req: Request, res: Response<outputBlogType>): void => {
    const id: string = req.params.id
    const blog: outputBlogType | undefined = blogsReposity.findOneById(id);
    if (blog) {
      res.status(200).json(blog);
      return;
    }
    res.status(404).send();
  },
  create: (
    req: Request<any, any, inputBlogType>,
    res: Response<outputBlogType | any>
  ): void => {
    const data: inputBlogType = matchedData(req);
    const blog: outputBlogType = blogsReposity.create(data);
    res.status(201).json(blog);
  },
  updateById: (
    req: Request<any, any, inputBlogType>,
    res: Response<outputBlogType>
  ): void => {
    const data: inputBlogType = matchedData(req);
    const id: string = req.params.id;
    const blogIndex: number = blogsReposity.findIndexById(id);
    if (blogIndex != -1) {
      blogsReposity.updateById(blogIndex, data);
      res.status(204).send();
      return
    }
    res.status(404).send();
  },
  deleteOneById: (req: Request, res: Response): void => {
    const id: string = req.params.id
    const blogIndex:number = blogsReposity.findIndexById(id)
    if(blogIndex != -1) {
      blogsReposity.delete(blogIndex)
      res.status(204).send()
      return
    }
    res.status(404).send()
  }
};
