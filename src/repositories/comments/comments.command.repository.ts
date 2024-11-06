import { InsertOneResult, ObjectId } from "mongodb";
import { CommentEntityDB } from "../../types/comments.type";
import { CommentEntityInput } from "../../types/comments.type";
import { commentsCollection } from "../../db/collections";

export const commentsCommandRepository = {
  create: async (post: CommentEntityDB): Promise<InsertOneResult> => {
    return await commentsCollection.insertOne(post);
  },
  findOneById: async (id: string): Promise<CommentEntityDB | null> => {
    return await commentsCollection.findOne({ _id: new ObjectId(id) });
  },
  updateOneById: async (id: string, data: CommentEntityInput): Promise<void> => {
    await commentsCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...data } });
    return;
  },
  deleteOneById: async (id: string): Promise<void> => {
    await commentsCollection.deleteOne({ _id: new ObjectId(id) });
    return;
  },
};
