import { DeviceEntityDB } from "../types/devices.type";
import { devicesCommandRepository } from "../repositories/devices/devices.command.repository";
import { ObjectId } from "mongodb";
import { apiError } from "../middlewares/errors.middliware";

export const devicesService = {
  add: async (data: any): Promise<void> => {
    const device: DeviceEntityDB = {
      _id: new ObjectId(),
      ip: data.ip,
      title: data.title,
      lastActiveDate: data.iat,
      deviceId: data.deviceId,
      exp: data.exp,
      userId: new ObjectId(data.id),
    };
    await devicesCommandRepository.create(device);
    await devicesService.deleleExpaireDevice(device.userId.toString());
    return;
  },
  update: async (data: any): Promise<void> => {
    const device = await devicesCommandRepository.findByUserAndDeviceId(data.id, data.deviceId);
    if (!device) {
      throw new apiError("Not found device", 401);
    }
    const updateDevice: DeviceEntityDB = {
      _id: device._id,
      ip: data.ip,
      title: data.title,
      lastActiveDate: data.iat,
      deviceId: data.deviceId,
      exp: data.exp,
      userId: new ObjectId(data.id),
    };
    await devicesCommandRepository.updateById(device._id.toString(), updateDevice);
    await devicesService.deleleExpaireDevice(device.userId.toString());
    return;
  },
  deleleExpaireDevice: async (userId: string): Promise<void> => {
    const devices: DeviceEntityDB[] = await devicesCommandRepository.getAllByUserId(userId);
    const currentTime = Math.floor(Date.now() / 1000);
    for (const device of devices) {
      if (currentTime > device.exp) {
        await devicesCommandRepository.deleteById(device._id.toString());
      }
    }
    return;
  },
  deleteAll: async (userId: string, deviceId: string): Promise<void> => {
    const devices: DeviceEntityDB[] = await devicesCommandRepository.getAllByUserId(userId);
    for (const device of devices) {
      if (device.deviceId !== deviceId) {
        await devicesCommandRepository.deleteById(device._id.toString());
      }
    }
    return;
  },
  deleteOne: async (userId: string, deviceId: string): Promise<void> => {
    const device: DeviceEntityDB | null = await devicesCommandRepository.findByDeviceId(deviceId);
    if (!device) {
      throw new apiError("Not found", 404);
    }
    if (device.userId.toString() !== userId) {
      throw new apiError("Forbidden", 403);
    }
    await devicesCommandRepository.deleteById(device._id.toString());
    return;
  },
};
