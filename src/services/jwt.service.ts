import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { UserEntityJwt } from "../types/users.type";
import { apiError } from "../middlewares/errors.middliware";

export type Payload = { id: string; deviceId: string; iat: number; exp: number };

export const JWTService = {
  generateAccess: (id: string): string => {
    const payload: UserEntityJwt = { id };
    return jwt.sign(payload, config.jwt.access, { expiresIn: "10s" });
  },
  verifyAccess: (token: string): Payload => {
    try {
      return jwt.verify(token, config.jwt.access) as Payload;
    } catch (e) {
      throw new apiError("Invalid token", 401);
    }
  },
  generateRefresh: (id: string, deviceId: string): string => {
    const payload: UserEntityJwt = { id, deviceId };
    return jwt.sign(payload, config.jwt.refresh, { expiresIn: "20s" });
  },
  verifyRefresh: (token: string): Payload => {
    try {
      return jwt.verify(token, config.jwt.refresh) as Payload;
    } catch (e) {
      throw new apiError("Invalid token", 401);
    }
  },
  decode: (token: string): JwtPayload => {
    return jwt.decode(token) as JwtPayload;
  },
};
