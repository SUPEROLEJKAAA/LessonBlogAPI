import { tokensCollection } from "../../db/collections";
import { TokenEntityDB } from "../../types/tokens.type";

export const tokensCommandRepository = {
  create: async (token: TokenEntityDB): Promise<string> => {
    const tokenId = await tokensCollection.insertOne(token);
    return tokenId.insertedId.toString();
  },
  findOneByToken: async (token: string): Promise<TokenEntityDB | null> => {
    return await tokensCollection.findOne({ token });
  },
};
