import { blogsCommandRepository } from "../repositories/blogs/blogs.command.repository";
import { postsCommandRepository } from "../repositories/posts/posts.command.repository";
import { PostEntityDB, PostEntityInput, PostEntityResponse } from "../types/posts.type";
import { BlogEntityDB } from "../types/blogs.type";
import { ObjectId } from "mongodb";

export const postsService = {
  create: async (data: PostEntityInput): Promise<string | null> => {
    const blog: BlogEntityDB | null = await blogsCommandRepository.findOneById(data.blogId);
    if (!blog) {
      return null;
    }
    const prepareData: PostEntityDB = {
      _id: new ObjectId(),
      ...data,
      blogName: blog!.name,
      createdAt: new Date(),
    };
    const isCreated = await postsCommandRepository.create(prepareData);
    if (isCreated.insertedId) {
      return isCreated.insertedId.toString();
    }
    return null;
  },
  findOneById: async (id: string): Promise<PostEntityDB | null> => {
    return await postsCommandRepository.findOneById(id);
  },
  updateOneById: async (id: string, data: PostEntityInput): Promise<boolean> => {
    const post: PostEntityDB | null = await postsCommandRepository.findOneById(id);
    if (post) {
      await postsCommandRepository.updateOneById(id, data);
      return true;
    }
    return false;
  },
  deleteOneById: async (id: string): Promise<boolean> => {
    const post: PostEntityDB | null = await postsCommandRepository.findOneById(id);
    if (post) {
      await postsCommandRepository.deleteOneById(id);
      return true;
    }
    return false;
  },
};
