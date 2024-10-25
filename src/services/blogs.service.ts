import { ObjectId } from "mongodb";
import { blogsCommandRepository } from "../repositories/blogs/blogs.command.repository";
import { BlogEntityInput, BlogEntityDB } from "../types/blogs.type";

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
  updateOneById: async (id: string, data: BlogEntityInput): Promise<boolean> => {
    const blog: BlogEntityDB | null = await blogsCommandRepository.findOneById(id);
    if (blog) {
      await blogsCommandRepository.updateOneById(id, data);
      return true;
    }
    return false;
  },
  deleteOneById: async (id: string): Promise<boolean> => {
    const blog: BlogEntityDB | null = await blogsCommandRepository.findOneById(id);
    if (blog) {
      await blogsCommandRepository.deleteOneById(id);
      return true;
    }
    return false;
  },
};
