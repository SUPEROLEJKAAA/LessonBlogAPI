import bcrypt from "bcrypt";
import { usersCommandRepository } from "../repositories/users/users.command.repository";
import { UserEntityAuth, UserEntityDB, UserEntityInput, UserEntityJwt } from "../types/users.type";
import { apiError } from "../middlewares/errors.middliware";
import { mailHelper } from "../utils/nodemailer.helper";
import { ErrorsType } from "../types/errors.type";
import { usersService } from "./users.service";

export const authService = {
  login: async (data: UserEntityAuth): Promise<UserEntityJwt> => {
    const user = await usersCommandRepository.findEmailOrLogin(data.loginOrEmail);
    if (user) {
      const compare = await bcrypt.compare(data.password, user.passwordHash);
      if (compare) return { id: user._id.toString() };
    }
    throw new apiError("No auth", 401);
  },
  registration: async (data: UserEntityInput): Promise<void> => {
    const newUserId: string = await usersService.create(data);
    const user: UserEntityDB | null = await usersCommandRepository.findOneById(newUserId);
    if (user) {
      helper._updateUserFields(user);
      await usersCommandRepository.updateOneById(user._id.toString(), user);
      await mailHelper.registation(user.email, user.confirmEmail.code!);
      return;
    }
    throw new apiError("Server Error", 500);
  },
  registraionConfirm: async (code: string): Promise<void> => {
    const user: UserEntityDB | null = await usersCommandRepository.findOneByCode(code);
    if (user) {
      helper._checkVerifyRules(user, code);
      helper._updateActivatedUser(user);
      await usersCommandRepository.updateOneById(user._id.toString(), user);
      return;
    }
    throw new apiError<ErrorsType>("Not found", 400, {
      errorsMessages: [{ message: "Not found code", field: "code" }],
    });
  },
  resendEmail: async (email: string): Promise<void> => {
    const user: UserEntityDB | null = await usersCommandRepository.findEmail(email);
    if (user && !user.confirmEmail.isActivated) {
      helper._updateUserFields(user);
      await usersCommandRepository.updateOneById(user._id.toString(), user);
      await mailHelper.registation(user.email, user.confirmEmail.code!);
      return;
    }
    throw new apiError<ErrorsType>("Not found", 400, {
      errorsMessages: [{ message: "Not found email", field: "email" }],
    });
  },
};

const helper = {
  _updateUserFields: (user: UserEntityDB): void => {
    user.confirmEmail.isActivated = false;
    user.confirmEmail.code = crypto.randomUUID();
    user.confirmEmail.exp = Date.now() + 30 * 60 * 1000;
    return;
  },
  _updateActivatedUser: (user: UserEntityDB): void => {
    user.confirmEmail.isActivated = true;
    user.confirmEmail.code = null;
    user.confirmEmail.exp = null;
    return;
  },
  _checkVerifyRules: (user: UserEntityDB, code: string) => {
    if (user.confirmEmail.isActivated) {
      throw new apiError<ErrorsType>("Error", 400, {
        errorsMessages: [{ message: "The account has already been activated", field: "code" }],
      });
    }
    const timeDifrrent = user.confirmEmail.exp! - Date.now();
    if (timeDifrrent < 0) {
      throw new apiError<ErrorsType>("Error", 400, {
        errorsMessages: [{ message: "The activation code lifetime has expired", field: "code" }],
      });
    }
    if (user.confirmEmail.code != code) {
      throw new apiError<ErrorsType>("Error", 400, { errorsMessages: [{ message: "Invalid code", field: "code" }] });
    }
  },
};
