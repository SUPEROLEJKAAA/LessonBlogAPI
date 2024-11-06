import { ObjectId } from "mongodb";

export type CommentEntityDB = {
  _id: ObjectId;
  content: string;
  postId: string;
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };
  createdAt: Date;
};

export type CommentEntityResponse = Omit<CommentEntityDB, "_id" | "postId"> & { id: string };

export type CommentEntityInput = {
  content: string;
};
