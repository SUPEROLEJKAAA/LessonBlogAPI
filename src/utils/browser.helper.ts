import { Request } from "express";

export const browserHelper = (req: Request) => {
  const ip: string = req.ip?.split(":").pop() || "Unkown IP";
  const title: string = req.headers["user-agent"] || "Unknown device";
  return { ip, title };
};
