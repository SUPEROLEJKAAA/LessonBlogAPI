import { UserEntityDB, UserEntityInput, UserEntityResponse } from "../../types/users.type";
import { usersCollection } from "../../db/collections";
import { InsertOneResult, ObjectId } from "mongodb";

export const usersCommandRepository = {
  create: async (post: UserEntityDB): Promise<InsertOneResult> => {
    return await usersCollection.insertOne(post);
  },
  findOneById: async (id: string): Promise<UserEntityDB | null> => {
    return await usersCollection.findOne({ _id: new ObjectId(id) });
  },
  findLogin: async (login: string): Promise<UserEntityDB | null> => {
    return await usersCollection.findOne({ email: { $regex: login, $options: "i" } });
  },
  findEmail: async (email: string): Promise<UserEntityDB | null> => {
    return await usersCollection.findOne({ email: { $regex: email, $options: "i" } });
  },
  findEmailOrLogin: async (data: string): Promise<UserEntityDB | null> => {
    return await usersCollection.findOne({
      $or: [{ email: { $regex: data, $options: "i" } }, { login: { $regex: data, $options: "i" } }],
    });
  },
  updateOneById: async (id: string, data: UserEntityInput): Promise<void> => {
    await usersCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...data } });
    return;
  },
  deleteOneById: async (id: string): Promise<void> => {
    await usersCollection.deleteOne({ _id: new ObjectId(id) });
    return;
  },
};
