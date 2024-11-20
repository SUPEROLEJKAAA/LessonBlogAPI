import { NextFunction, Response, Request } from "express";
import { rateCommandRepository } from "../repositories/rate/rate.coomand.repository";
import { ObjectId } from "mongodb";

export const rateLimit = async (req: Request, res: Response, next: NextFunction) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const data = { _id: new ObjectId(), ip: req.ip?.split(":").pop() || "Uknown IP", url: req.originalUrl, timestamp };
  await rateCommandRepository.add(data);
  const count = await rateCommandRepository.count(data.ip, data.url, data.timestamp);
  await rateCommandRepository.delete(data.timestamp);
  if (count > 5) {
    res.status(429).send();
    return;
  }
  next();
};
