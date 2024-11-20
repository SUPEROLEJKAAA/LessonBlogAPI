import { rateCollection } from "../../db/collections";
import { RateLimitDB } from "../../types/common.type";

export const rateCommandRepository = {
  add: async (data: RateLimitDB): Promise<void> => {
    await rateCollection.insertOne(data);
    return;
  },
  count: async (ip: string, url: string, currentTime: number): Promise<number> => {
    return await rateCollection.countDocuments({ ip, url, timestamp: { $gte: currentTime - 10 } });
  },
  delete: async (currentTime: number): Promise<void> => {
    await rateCollection.deleteMany({ timestamp: { $lte: currentTime - 20 } });
    return;
  },
};
