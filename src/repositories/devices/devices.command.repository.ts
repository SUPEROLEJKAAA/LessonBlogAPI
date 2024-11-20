import { ObjectId, WithId } from "mongodb";
import { devicesCollection } from "../../db/collections";
import { DeviceEntityDB, DeviceEntityInput } from "../../types/devices.type";

export const devicesCommandRepository = {
  create: async (device: DeviceEntityDB): Promise<string> => {
    const tokenId = await devicesCollection.insertOne(device);
    return tokenId.insertedId.toString();
  },
  findByUserAndDeviceId: async (userId: string, deviceId: string): Promise<DeviceEntityDB | null> => {
    return await devicesCollection.findOne({ userId: new ObjectId(userId), deviceId });
  },
  findByDeviceId: async (deviceId: string): Promise<DeviceEntityDB | null> => {
    return await devicesCollection.findOne({ deviceId });
  },
  updateById: async (id: string, device: DeviceEntityDB): Promise<void> => {
    await devicesCollection.updateOne({ _id: new ObjectId(id) }, { $set: { ...device } });
    return;
  },
  getAllByUserId: async (userId: string): Promise<DeviceEntityDB[]> => {
    return devicesCollection.find({ userId: new ObjectId(userId) }).toArray();
  },
  deleteById: async (id: string): Promise<void> => {
    await devicesCollection.deleteOne({ _id: new ObjectId(id) });
    return;
  },
};
