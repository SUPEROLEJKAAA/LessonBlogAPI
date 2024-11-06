import { CommentEntityDB, CommentEntityInput } from "../types/comments.type";
import { ObjectId } from "mongodb";
import { commentsCommandRepository } from "../repositories/comments/comments.command.repository";
import { UserEntityJwt, UserEntityResponse } from "../types/users.type";
import { apiError } from "../middlewares/errors.middliware";

export const commentsService = {
  create: async (postId: string, data: CommentEntityInput, user: UserEntityResponse): Promise<string> => {
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
    throw new apiError("Error", 500);
  },
  updateOneById: async (id: string, user: UserEntityJwt, data: CommentEntityInput): Promise<void> => {
    const comment: CommentEntityDB | null = await commentsCommandRepository.findOneById(id);
    console.log(comment);
    console.log(user);
    if (comment) {
      if (comment.commentatorInfo.userId !== user.id) {
        throw new apiError("Forbidden", 403);
      }
      await commentsCommandRepository.updateOneById(id, data);
      return;
    }
    throw new apiError("Not found", 404);
  },
  deleteOneById: async (id: string, user: UserEntityJwt): Promise<void> => {
    const comment: CommentEntityDB | null = await commentsCommandRepository.findOneById(id);
    if (comment) {
      if (comment.commentatorInfo.userId !== user.id) {
        throw new apiError("Forbidden", 403);
      }
      await commentsCommandRepository.deleteOneById(id);
      return;
    }
    throw new apiError("Not found", 404);
  },
};
