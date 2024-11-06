import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { usersService } from "../services/users.service";
import { UserEntityInput, UserEntityResponse } from "../types/users.type";
import { usersQueryRepository } from "../repositories/users/users.query.repository";
import { paginationHelper } from "../utils/pagination.helper";
import { OutputPaginationType, PaginationParamType } from "../types/pagination.type";

export const usersController = {
  getUsers: async (req: Request, res: Response): Promise<void> => {
    const data: PaginationParamType = matchedData(req);
    const params: PaginationParamType = paginationHelper.mapping(data, "users");
    const users: OutputPaginationType = await usersQueryRepository.getUsers(params);
    res.status(200).json(users);
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: UserEntityInput = matchedData(req);
      const userId: string = await usersService.create(data);
      const user: UserEntityResponse = await usersQueryRepository.findOneById(userId);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;
      await usersService.delete(id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
};
