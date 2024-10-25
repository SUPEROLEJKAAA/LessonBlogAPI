import { ObjectId } from "mongodb";

export type BlogEntityDB = {
  _id: ObjectId;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  isMembership: boolean;
};
export type BlogEntityResponse = Omit<BlogEntityDB, "_id"> & {
  id: string;
};
export type BlogEntityInput = Omit<BlogEntityDB, "_id" | "createdAt" | "isMembership">;
