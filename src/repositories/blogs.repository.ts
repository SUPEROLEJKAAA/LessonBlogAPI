import { v4 as uuid } from "uuid";
import {  blogsCollection } from "../db/collections";
import { inputBlogType, outputBlogType } from "../types/blogs.type";

export const blogsReposity = {
  all: async (): Promise<outputBlogType[]> => {
    return await blogsCollection.find({}, { projection: { _id: 0 } }).toArray();
  },
  create: async (data: inputBlogType): Promise<outputBlogType | null> => {
    const id: string = uuid();
    await blogsCollection.insertOne({
      id,
      ...data,
      createdAt: new Date(),
      isMembership: false,
    });
    const post: outputBlogType | null = await blogsCollection
      .findOne({ id }, { projection: { _id: 0 } })
    return post;
  },
  findOneById: async (id: string): Promise<outputBlogType | null> => {
    const blog: outputBlogType | null = await blogsCollection
      .findOne({ id }, { projection: { _id: 0 } })
    return blog;
  },
  updateOneById: async (id: string, data: inputBlogType): Promise<void> => {
    await blogsCollection.findOneAndUpdate({ id }, { $set: { ...data } });
    return;
  },
  deleteOneById: async (id: string): Promise<void> => {
    await blogsCollection.deleteOne({ id });
    return;
  },
};
