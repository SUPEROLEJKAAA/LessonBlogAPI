import { ObjectId } from "mongodb";
import { devicesCollection } from "../../db/collections";
import { DeviceEntityDB, DeviceEntityResponse } from "../../types/devices.type";

export const deviceQueryRepository = {
  getAll: async (userId: string): Promise<DeviceEntityResponse[]> => {
    const devices: DeviceEntityDB[] = await devicesCollection.find({ userId: new ObjectId(userId) }).toArray();
    return devices.map(mapping);
  },
};

const mapping = (device: DeviceEntityDB): DeviceEntityResponse => {
  return {
    ip: device.ip,
    title: device.title,
    lastActiveDate: new Date(device.lastActiveDate * 1000).toISOString(),
    deviceId: device.deviceId,
  };
};
