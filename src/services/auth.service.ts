import bcrypt from "bcrypt";
import { usersCommandRepository } from "../repositories/users/users.command.repository";
import { UserEntityAuth, UserEntityDB, UserEntityInput, UserEntityJwt } from "../types/users.type";
import { apiError } from "../middlewares/errors.middliware";
import { mailHelper } from "../utils/nodemailer.helper";
import { ErrorsType } from "../types/errors.type";
import { usersService } from "./users.service";
import { JWTService, Payload } from "./jwt.service";
import { devicesService } from "./devices.service";
import { devicesCommandRepository } from "../repositories/devices/devices.command.repository";
import { DeviceEntityDB } from "../types/devices.type";
export const authService = {
  login: async (data: UserEntityAuth, browser: any): Promise<any> => {
    const user = await usersCommandRepository.findEmailOrLogin(data.loginOrEmail);
    if (!user) {
      throw new apiError("Unknown user", 401);
    }
    const compare = await bcrypt.compare(data.password, user.passwordHash);
    if (!compare) {
      throw new apiError("No auth", 401);
    }
    const userId: string = user._id.toString();
    const deviceId: string = crypto.randomUUID();
    const accessToken: string = JWTService.generateAccess(userId);
    const refreshToken: string = JWTService.generateRefresh(userId, deviceId);
    const payload = JWTService.decode(refreshToken);
    const deviceData = { ...payload, ...browser };
    await devicesService.add(deviceData);
    return { accessToken, refreshToken };
  },
  refreshToken: async (payload: any, browser: any) => {
    const device: DeviceEntityDB | null = await devicesCommandRepository.findByUserAndDeviceId(
      payload.id,
      payload.deviceId,
    );
    if (!device) {
      throw new apiError("Inactive device", 401);
    }
    const accessToken: string = JWTService.generateAccess(payload.id);
    const refreshToken: string = JWTService.generateRefresh(payload.id, payload.deviceId);
    const newPayload = JWTService.decode(refreshToken);
    const deviceData = { ...newPayload, ...browser };
    await devicesService.update(deviceData);
    return { accessToken, refreshToken };
  },
  logout: async (payload: Payload): Promise<void> => {
    const device: DeviceEntityDB | null = await devicesCommandRepository.findByUserAndDeviceId(
      payload.id,
      payload.deviceId,
    );
    if (!device) {
      throw new apiError("Inactive device", 401);
    }
    await devicesCommandRepository.deleteById(device._id.toString());
    return;
  },
  registration: async (data: UserEntityInput): Promise<void> => {
    const newUserId: string = await usersService.create(data);
    const user: UserEntityDB | null = await usersCommandRepository.findOneById(newUserId);
    if (!user) {
      throw new apiError("Server Error", 500);
    }
    helper._updateNotActivatedUser(user);
    await usersCommandRepository.updateOneById(user._id.toString(), user);
    await mailHelper.registation(user.email, user.confirmEmail.code!);
    return;
  },
  registraionConfirm: async (code: string): Promise<void> => {
    const user: UserEntityDB | null = await usersCommandRepository.findOneByCode(code);
    if (!user) {
      throw new apiError<ErrorsType>("Not found", 400, {
        errorsMessages: [{ message: "Not found code", field: "code" }],
      });
    }
    helper._checkVerifyRules(user, code);
    helper._updateActivatedUser(user);
    await usersCommandRepository.updateOneById(user._id.toString(), user);
    return;
  },
  resendEmail: async (email: string): Promise<void> => {
    const user: UserEntityDB | null = await usersCommandRepository.findEmail(email);
    if (user && !user.confirmEmail.isActivated) {
      helper._updateNotActivatedUser(user);
      await usersCommandRepository.updateOneById(user._id.toString(), user);
      mailHelper.registation(user.email, user.confirmEmail.code!);
      return;
    }
    throw new apiError<ErrorsType>("Not found", 400, {
      errorsMessages: [{ message: "Not found email", field: "email" }],
    });
  },
};

const helper = {
  _updateNotActivatedUser: (user: UserEntityDB): void => {
    user.confirmEmail.isActivated = false;
    user.confirmEmail.code = crypto.randomUUID();
    user.confirmEmail.exp = Date.now() + 30 * 60 * 1000;
    return;
  },
  _updateActivatedUser: (user: UserEntityDB): void => {
    user.confirmEmail.isActivated = true;
    user.confirmEmail.code = null;
    user.confirmEmail.exp = null;
    return;
  },
  _checkVerifyRules: (user: UserEntityDB, code: string) => {
    if (user.confirmEmail.isActivated) {
      throw new apiError<ErrorsType>("Error", 400, {
        errorsMessages: [{ message: "The account has already been activated", field: "code" }],
      });
    }
    const timeDifrrent = user.confirmEmail.exp! - Date.now();
    if (timeDifrrent < 0) {
      throw new apiError<ErrorsType>("Error", 400, {
        errorsMessages: [{ message: "The activation code lifetime has expired", field: "code" }],
      });
    }
    if (user.confirmEmail.code != code) {
      throw new apiError<ErrorsType>("Error", 400, { errorsMessages: [{ message: "Invalid code", field: "code" }] });
    }
  },
};
