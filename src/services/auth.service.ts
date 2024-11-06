import bcrypt from "bcrypt";
import { usersCommandRepository } from "../repositories/users/users.command.repository";
import { UserEntityAuth, UserEntityJwt } from "../types/users.type";
import { apiError } from "../middlewares/errors.middliware";

export const authService = {
  login: async (data: UserEntityAuth): Promise<UserEntityJwt> => {
    const user = await usersCommandRepository.findEmailOrLogin(data.loginOrEmail);
    if (user) {
      const compare = await bcrypt.compare(data.password, user.passwordHash);
      if (compare) return { id: user._id.toString() };
    }
    throw new apiError("No auth", 401);
  },
};
