import { UserEntityDB, UserEntityInput, UserEntityResponse } from "../../types/users.type";
import { usersCollection } from "../../db/collections";
import { ObjectId } from "mongodb";

export const usersCommandRepository = {
  create: async (post: UserEntityDB): Promise<string> => {
    const userId = await usersCollection.insertOne(post);
    return userId.insertedId.toString();
  },
  findOneById: async (id: string): Promise<UserEntityDB | null> => {
    return await usersCollection.findOne({ _id: new ObjectId(id) });
  },
  findOneByCode: async (code: string): Promise<UserEntityDB | null> => {
    return await usersCollection.findOne({ $or: [{ "confirmEmail.code": code }, { "recoveryPassword.code": code }] });
  },
  findLogin: async (login: string): Promise<UserEntityDB | null> => {
    return await usersCollection.findOne({ login: { $regex: login, $options: "i" } });
  },
  findEmail: async (email: string): Promise<UserEntityDB | null> => {
    return await usersCollection.findOne({ email: { $regex: email, $options: "i" } });
  },
  findEmailOrLogin: async (data: string): Promise<UserEntityDB | null> => {
    return await usersCollection.findOne({
      $or: [{ email: { $regex: data, $options: "i" } }, { login: { $regex: data, $options: "i" } }],
    });
  },
  updateOneById: async (id: string, data: Partial<UserEntityDB>): Promise<void> => {
    await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { ...data } });
    return;
  },
  deleteOneById: async (id: string): Promise<void> => {
    await usersCollection.deleteOne({ _id: new ObjectId(id) });
    return;
  },
};
