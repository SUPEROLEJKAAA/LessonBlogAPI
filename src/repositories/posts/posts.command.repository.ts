import { PostEntityInput, PostEntityDB } from "../../types/posts.type";
import { postsCollection } from "../../db/collections";
import { InsertOneResult, ObjectId } from "mongodb";

export const postsCommandRepository = {
  create: async (post: PostEntityDB): Promise<InsertOneResult> => {
    return await postsCollection.insertOne(post);
  },
  findOneById: async (id: string): Promise<PostEntityDB | null> => {
    return await postsCollection.findOne({ _id: new ObjectId(id) });
  },
  updateOneById: async (id: string, data: PostEntityInput): Promise<void> => {
    await postsCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...data } });
    return;
  },
  deleteOneById: async (id: string): Promise<void> => {
    await postsCollection.deleteOne({ _id: new ObjectId(id) });
    return;
  },
};
