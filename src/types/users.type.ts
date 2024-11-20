import { ObjectId } from "mongodb";

export type UserEntityDB = {
  _id: ObjectId;
  login: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  confirmEmail: {
    isActivated: boolean;
    code: string | null;
    exp: number | null;
  };
};

export type UserEntityResponse = Omit<UserEntityDB, "passwordHash" | "_id" | "confirmEmail"> & { id: string };
export type UserEntityInput = Omit<UserEntityDB, "passwordHash" | "createdAt" | "_id" | "confirmEmail"> & {
  password: string;
};
export type UserEntityAuth = {
  loginOrEmail: string;
  password: string;
};
export type UserEntityJwt = {
  id: string;
  deviceId?: string;
};
