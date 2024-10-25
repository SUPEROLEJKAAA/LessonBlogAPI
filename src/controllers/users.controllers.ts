import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { usersService } from "../services/users.service";
import { UserEntityAuth, UserEntityInput } from "../types/users.type";
import { usersQueryRepository } from "../repositories/users/users.query.repository";
import { paginationHelper } from "../utils/pagination.helper";
import { OutputPaginationType, PaginationParamType } from "../types/pagination.type";
import { ObjectId } from "mongodb";

export const usersController = {
  getUsers: async (req: Request, res: Response): Promise<void> => {
    const data: PaginationParamType = matchedData(req);
    const params: PaginationParamType = paginationHelper.mapping(data, "users");
    const users: OutputPaginationType = await usersQueryRepository.getUsers(params);
    res.status(200).json(users);
  },
  create: async (req: Request, res: Response): Promise<void> => {
    const data: UserEntityInput = matchedData(req);
    const isUserCreated = await usersService.create(data);
    if (isUserCreated.status && isUserCreated.data) {
      const user = await usersQueryRepository.findOneById(isUserCreated.data);
      res.status(201).json(user);
      return;
    }
    res.status(400).json({ errorsMessages: isUserCreated.message });
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const isDeleted = await usersService.delete(id);
    if (isDeleted) {
      res.status(204).send();
      return;
    }
    res.status(404).send();
  },
  auth: async (req: Request, res: Response) => {
    const data: UserEntityAuth = matchedData(req);
    const result = await usersService.auth(data);
    if (result) {
      res.status(204).send();
      return;
    }
    res.status(401).send();
  },
};
