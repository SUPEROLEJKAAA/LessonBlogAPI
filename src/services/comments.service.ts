import { JwtPayload } from "jsonwebtoken";
import { CommentEntityDB, CommentEntityInput } from "../types/comments.type";
import { ObjectId } from "mongodb";
import { commentsCommandRepository } from "../repositories/comments/comments.command.repository";

export const commentsService = {
  create: async (postId: string, data: CommentEntityInput, user: JwtPayload): Promise<string | null> => {
    const prepareData: CommentEntityDB = {
      _id: new ObjectId(),
      content: data.content,
      postId,
      commentatorInfo: {
        userId: user.id,
        userLogin: user.login,
      },
      createdAt: new Date(),
    };
    const isCreated = await commentsCommandRepository.create(prepareData);
    if (isCreated) {
      return isCreated.insertedId.toString();
    }
    return null;
  },
};
