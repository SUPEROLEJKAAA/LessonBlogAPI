import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/collections";
import { CommentEntityDB, CommentEntityResponse } from "../../types/comments.type";
import { PaginationParamType, OutputPaginationType } from "../../types/pagination.type";

export const commentsQueryRepository = {
  getPosts: async (data: PaginationParamType): Promise<OutputPaginationType> => {
    const result: CommentEntityDB[] = await commentsCollection
      .find(data.filter ?? {})
      .sort({ [data.sortBy]: data.sortDirection as 1 | -1 })
      .skip(data.skipCount!)
      .limit(data.pageSize)
      .toArray();
    const countDocuments: number = await commentsCollection.countDocuments(data?.filter);
    const pagesCount: number = Math.ceil(countDocuments / data.pageSize);
    return {
      pagesCount,
      page: data.pageNumber,
      pageSize: data.pageSize,
      totalCount: countDocuments,
      items: result.map(mappging),
    };
  },
  findOneById: async (id: string): Promise<CommentEntityResponse | null> => {
    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });
    if (comment) {
      return mappging(comment);
    }
    return null;
  },
};

const mappging = (comment: CommentEntityDB): CommentEntityResponse => {
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: comment.commentatorInfo,
    createdAt: comment.createdAt,
  };
};
