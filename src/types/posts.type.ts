import { ObjectId } from "mongodb";

export type PostEntityDB = {
  _id: ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
};

export type PostEntityResponse = Omit<PostEntityDB, "_id"> & {
  id: string;
};

export type PostEntityInput = Omit<PostEntityDB, "_id" | "blogName" | "createdAt">;
