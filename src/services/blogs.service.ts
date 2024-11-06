import { ObjectId } from "mongodb";
import { blogsCommandRepository } from "../repositories/blogs/blogs.command.repository";
import { BlogEntityInput, BlogEntityDB } from "../types/blogs.type";
import { apiError } from "../middlewares/errors.middliware";

export const blogsService = {
  create: async (data: BlogEntityInput): Promise<string | null> => {
    const prepareData: BlogEntityDB = {
      _id: new ObjectId(),
      ...data,
      createdAt: new Date(),
      isMembership: false,
    };
    const isCreated = await blogsCommandRepository.create(prepareData);
    if (isCreated) {
      return isCreated.insertedId.toString();
    }
    return null;
  },
  updateOneById: async (id: string, data: BlogEntityInput): Promise<void> => {
    const blog: BlogEntityDB | null = await blogsCommandRepository.findOneById(id);
    if (blog) {
      await blogsCommandRepository.updateOneById(id, data);
      return;
    }
    throw new apiError("Not Found", 404);
  },
  deleteOneById: async (id: string): Promise<void> => {
    const blog: BlogEntityDB | null = await blogsCommandRepository.findOneById(id);
    if (blog) {
      await blogsCommandRepository.deleteOneById(id);
      return;
    }
    throw new apiError("Not Found", 404);
  },
};
