import { ObjectId } from "mongodb";

export type DeviceEntityDB = {
  _id: ObjectId;
  ip: string;
  title: string;
  lastActiveDate: number;
  deviceId: string;
  exp: number;
  userId: ObjectId;
};

export type DeviceEntityInput = Omit<DeviceEntityDB, "_id">;
export type DeviceEntityResponse = Omit<DeviceEntityDB, "_id" | "exp" | "userId" | "lastActiveDate"> & {
  lastActiveDate: string;
};
