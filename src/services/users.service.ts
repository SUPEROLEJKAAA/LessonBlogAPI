import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { UserEntityDB, UserEntityInput } from "../types/users.type";
import { usersCommandRepository } from "../repositories/users/users.command.repository";
import { ErrorMessageType, ErrorsType } from "../types/errors.type";
import { apiError } from "../middlewares/errors.middliware";

export const usersService = {
  create: async (data: UserEntityInput): Promise<string> => {
    const errorArray: ErrorMessageType[] = [];
    const checkingMail = await usersCommandRepository.findEmail(data.email);
    if (checkingMail) {
      errorArray.push({ field: "email", message: "email should be unique" });
    }
    const checkingLogin = await usersCommandRepository.findLogin(data.login);
    if (checkingLogin) {
      errorArray.push({ field: "login", message: "login should be unique" });
    }
    if (errorArray.length) {
      throw new apiError<ErrorsType>("Errors", 400, { errorsMessages: errorArray });
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
      return isCreated.insertedId.toString();
    }
    throw new apiError("Error", 500);
  },
  delete: async (id: string): Promise<void> => {
    const user: UserEntityDB | null = await usersCommandRepository.findOneById(id);
    if (user) {
      await usersCommandRepository.deleteOneById(id);
      return;
    }
    throw new apiError("Not found", 404);
  },
};
