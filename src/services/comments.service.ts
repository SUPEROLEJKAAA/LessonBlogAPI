import { CommentEntityDB, CommentEntityInput } from "../types/comments.type";
import { ObjectId } from "mongodb";
import { commentsCommandRepository } from "../repositories/comments/comments.command.repository";
import { UserEntityJwt } from "../types/users.type";
import { apiError } from "../middlewares/errors.middliware";
import { postsCommandRepository } from "../repositories/posts/posts.command.repository";
import { usersCommandRepository } from "../repositories/users/users.command.repository";

export const commentsService = {
  create: async (postId: string, data: CommentEntityInput, userId: string): Promise<string> => {
    const post = await postsCommandRepository.findOneById(postId);
    if (!post) {
      throw new apiError("Not found post", 404);
    }
    const user = await usersCommandRepository.findOneById(userId);
    if (!user) {
      throw new apiError("Not found user", 401);
    }
    const prepareData: CommentEntityDB = {
      _id: new ObjectId(),
      content: data.content,
      postId,
      commentatorInfo: {
        userId: user._id.toString(),
        userLogin: user.login,
      },
      createdAt: new Date(),
    };
    const commentId = await commentsCommandRepository.create(prepareData);
    if (commentId) {
      return commentId;
    }
    throw new apiError("Error", 500);
  },
  updateOneById: async (id: string, user: UserEntityJwt, data: CommentEntityInput): Promise<void> => {
    const comment: CommentEntityDB | null = await commentsCommandRepository.findOneById(id);
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
