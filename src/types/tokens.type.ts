import { ObjectId } from "mongodb";

export type TokenEntityDB = {
  _id: ObjectId;
  token: string;
  createdAt: Date;
};

export type TokenEntityInput = Omit<TokenEntityDB, "_id" | "createdAt">;
