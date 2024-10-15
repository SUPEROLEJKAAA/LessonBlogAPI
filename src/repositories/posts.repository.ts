import { v4 as uuid } from "uuid";
import { inputPostType, outputPostType } from "../types/posts.type";
import { blogsReposity } from "./blogs.repository";
import { outputBlogType } from "../types/blogs.type";
import { postsCollection } from "../db/collections";

export const postsRepository = {
  all: async (): Promise<outputPostType[]> => {
    return await postsCollection.find({}, { projection: { _id: 0 } }).toArray();
  },
  create: async (data: inputPostType): Promise<outputPostType> => {
    const id: string = uuid();
    const blog = (await blogsReposity.findOneById(
      data.blogId
    )) as outputBlogType;
    await postsCollection.insertOne({
      id,
      ...data,
      blogName: blog?.name as string,
      createdAt: new Date(),
    });
    const post = (await postsRepository.findOneById(id)) as outputPostType;
    return post;
  },
  findOneById: async (id: string): Promise<outputPostType | null> => {
    return await postsCollection.findOne({ id }, { projection: { _id: 0 } });
  },
  updateOneById: async (id: string, data: inputPostType): Promise<void> => {
    await postsCollection.findOneAndUpdate({ id }, { $set: { ...data } });
    return;
  },
  deleteOneById: async (id: string): Promise<void> => {
    await postsCollection.deleteOne({ id });
    return;
  },
};
