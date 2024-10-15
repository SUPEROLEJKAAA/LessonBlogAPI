import { Request, Response } from "express";
import { postsRepository } from "../repositories/posts.repository";
import { inputPostType, outputPostType } from "../types/posts.type";
import { matchedData } from "express-validator";

export const postsController = {
  all: async (req: Request, res: Response<outputPostType[]>): Promise<void> => {
    const posts: outputPostType[] = await postsRepository.all();
    res.status(200).json(posts);
  },
  create: async (
    req: Request<any, any, inputPostType>,
    res: Response<outputPostType>
  ): Promise<void> => {
    const data: inputPostType = matchedData(req);
    const newPost: outputPostType = await postsRepository.create(data);
    res.status(201).json(newPost);
  },
  findOneById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const post: outputPostType | null = await postsRepository.findOneById(id);
    if (post) {
      res.status(200).json(post);
      return;
    }
    res.status(404).send();
  },
  updateOneById: async (
    req: Request<any, any, inputPostType>,
    res: Response
  ): Promise<void> => {
    const id: string = req.params.id;
    const data: inputPostType = matchedData(req);
    const post: outputPostType | null = await postsRepository.findOneById(id);
    if (post) {
      await postsRepository.updateOneById(post.id, data);
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  deleteOneById: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const post: outputPostType | null = await postsRepository.findOneById(id);
    if (post) {
      postsRepository.deleteOneById(post.id);
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
};
