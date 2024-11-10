import { blogsCommandRepository } from "../repositories/blogs/blogs.command.repository";
import { postsCommandRepository } from "../repositories/posts/posts.command.repository";
import { PostEntityDB, PostEntityInput, PostEntityResponse } from "../types/posts.type";
import { BlogEntityDB } from "../types/blogs.type";
import { ObjectId } from "mongodb";
import { apiError } from "../middlewares/errors.middliware";

export const postsService = {
  create: async (data: PostEntityInput): Promise<string> => {
    const blog: BlogEntityDB | null = await blogsCommandRepository.findOneById(data.blogId);
    if (!blog) {
      throw new apiError("Not found", 404);
    }
    const prepareData: PostEntityDB = {
      _id: new ObjectId(),
      ...data,
      blogName: blog!.name,
      createdAt: new Date(),
    };
    const postId = await postsCommandRepository.create(prepareData);
    if (postId) {
      return postId
    }
    throw new apiError("Error", 500);
  },
  findOneById: async (id: string): Promise<PostEntityDB | null> => {
    return await postsCommandRepository.findOneById(id);
  },
  updateOneById: async (id: string, data: PostEntityInput): Promise<void> => {
    const post: PostEntityDB | null = await postsCommandRepository.findOneById(id);
    if (post) {
      await postsCommandRepository.updateOneById(id, data);
      return;
    }
    throw new apiError("Not Found", 404);
  },
  deleteOneById: async (id: string): Promise<void> => {
    const post: PostEntityDB | null = await postsCommandRepository.findOneById(id);
    if (post) {
      await postsCommandRepository.deleteOneById(id);
      return
    }
    throw new apiError("Not Found", 404);
  },
};
