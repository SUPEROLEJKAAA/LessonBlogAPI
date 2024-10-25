import { blogsCollection } from "../../db/collections";
import { BlogEntityInput, BlogEntityDB } from "../../types/blogs.type";
import { InsertOneResult, ObjectId } from "mongodb";

export const blogsCommandRepository = {
  create: async (blog: BlogEntityDB): Promise<InsertOneResult> => {
    return await blogsCollection.insertOne(blog);
  },
  findOneById: async (id: string): Promise<BlogEntityDB | null> => {
    return await blogsCollection.findOne({ _id: new ObjectId(id) });
  },
  updateOneById: async (id: string, data: BlogEntityInput): Promise<void> => {
    await blogsCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...data } });
    return;
  },
  deleteOneById: async (id: string): Promise<void> => {
    await blogsCollection.deleteOne({ _id: new ObjectId(id) });
    return;
  },
};