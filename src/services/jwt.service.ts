import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserEntityJwt } from "../types/users.type";

export const JWTService = {
  generation: (id: string): string => {
    const payload: UserEntityJwt = { id };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
  },
  verify: (token: string) => {
    return jwt.verify(token, config.jwtSecret);
  },
};
