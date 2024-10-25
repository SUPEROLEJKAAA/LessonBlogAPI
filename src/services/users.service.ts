import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { UserEntityAuth, UserEntityDB, UserEntityInput } from "../types/users.type";
import { usersCommandRepository } from "../repositories/users/users.command.repository";

type Result<T> = {
  status: boolean; //0, 1,
  data?: T;
  message?: string | Object[];
};

export const usersService = {
  create: async (data: UserEntityInput): Promise<Result<string>> => {
    const errorArray = [];
    const checkingMail = await usersCommandRepository.findEmail(data.email);
    if (checkingMail) {
      errorArray.push({ field: "email", message: "email should be unique" });
    }
    const checkingLogin = await usersCommandRepository.findLogin(data.login);
    if (checkingLogin) {
      errorArray.push({ field: "login", message: "login should be unique" });
    }
    if (errorArray.length) {
      return { status: false, message: errorArray };
    }
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, passwordSalt);
    const prepareData: UserEntityDB = {
      _id: new ObjectId(),
      login: data.login,
      email: data.email,
      passwordHash,
      createdAt: new Date(),
    };
    const isCreated = await usersCommandRepository.create(prepareData);
    if (isCreated.insertedId) {
      return { status: true, data: isCreated.insertedId.toString() };
    }
    return { status: false };
  },
  delete: async (id: string): Promise<boolean> => {
    const user: UserEntityDB | null = await usersCommandRepository.findOneById(id);
    if (user) {
      await usersCommandRepository.deleteOneById(id);
      return true;
    }
    return false;
  },
  auth: async (data: UserEntityAuth): Promise<boolean> => {
    const user = await usersCommandRepository.findEmailOrLogin(data.loginOrEmail);
    if (user) {
      const compare = await bcrypt.compare(data.password, user.passwordHash);
      return compare;
    }
    return false;
  },
};
