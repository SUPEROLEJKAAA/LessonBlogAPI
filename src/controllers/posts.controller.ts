import { Request, Response } from "express";
import { postsRepository } from "../repositories/posts.repository";
import { inputPostType, outputPostType } from "../types/posts.type";
import { matchedData } from "express-validator";

export const postsController = {
  all: (req: Request, res: Response<outputPostType[]>): void => {
    const posts: outputPostType[] = postsRepository.all();
    res.status(200).json(posts);
  },
  create: (
    req: Request<any, any, inputPostType>,
    res: Response<outputPostType>
  ): void => {
    const data: inputPostType = matchedData(req);
    const newPost: outputPostType = postsRepository.create(data);
    res.status(201).json(newPost);
  },
  findOneById: (req: Request, res: Response): void => {
    const id: string = req.params.id;
    const post: outputPostType | undefined = postsRepository.findOneById(id);
    if (post) {
      res.status(200).json(post);
      return;
    }
    res.status(404).send();
  },
  updateOneById: (
    req: Request<any, any, inputPostType>,
    res: Response
  ): void => {
    const id: string = req.params.id;
    const data: inputPostType = matchedData(req);
    const postIndex: number = postsRepository.findOneByIndex(id);
    if (postIndex != -1) {
      postsRepository.updateOneById(postIndex, data);
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  deleteOneById: (req: Request, res: Response): void => {
    const id: string = req.params.id;
    const postIndex: number = postsRepository.findOneByIndex(id);
    if (postIndex != -1) {
      postsRepository.delete(postIndex);
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
};
