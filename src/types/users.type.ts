import { ObjectId } from "mongodb";

export type UserEntityDB = {
  _id: ObjectId;
  login: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

export type UserEntityResponse = Omit<UserEntityDB, "passwordHash" | "_id"> & { id: string };
export type UserEntityInput = Omit<UserEntityDB, "passwordHash" | "createdAt" | "_id"> & {
  password: string;
};
export type UserEntityAuth = {
  loginOrEmail: string;
  password: string;
};
export type UserEntityJwt = {
  id: string;
};
