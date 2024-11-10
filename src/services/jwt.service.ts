import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserEntityJwt } from "../types/users.type";
import { apiError } from "../middlewares/errors.middliware";

export type Payload = { id: string; ait: number; exp: number };

export const JWTService = {
  generation: (id: string, exp: string): string => {
    const payload: UserEntityJwt = { id };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: exp });
  },
  verify: (token: string): Payload => {
    try {
      return jwt.verify(token, config.jwtSecret) as Payload;
    } catch (e) {
      throw new apiError("Invalid token", 401);
    }
  },
};
