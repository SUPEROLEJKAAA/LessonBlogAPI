import { ObjectId } from "mongodb";

export type RateLimitDB = {
  _id: ObjectId;
  ip: string;
  url: string;
  timestamp: number;
};
export type RateLimitInput = Omit<RateLimitDB, "_id">;
