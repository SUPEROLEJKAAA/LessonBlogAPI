import { ObjectId } from "mongodb";
import { TokenEntityDB } from "../types/tokens.type";
import { tokensCommandRepository } from "../repositories/tokens/tokens.command.repository";
import { apiError } from "../middlewares/errors.middliware";

export const tokensService = {
  addTokenBlackList: async (refreshToken: string): Promise<void> => {
    const preData: TokenEntityDB = {
      _id: new ObjectId(),
      token: refreshToken,
      createdAt: new Date(),
    };
    await tokensCommandRepository.create(preData);
    return;
  },
  checkTokenBlackList: async (refreshToken: string): Promise<void> => {
    const token = await tokensCommandRepository.findOneByToken(refreshToken);
    if (!token) {
      return;
    }
    throw new apiError("Unauthorized", 401);
  },
};
