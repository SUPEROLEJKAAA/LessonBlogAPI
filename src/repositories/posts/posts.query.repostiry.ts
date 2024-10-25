import { ObjectId } from "mongodb";
import { postsCollection } from "../../db/collections";
import { OutputPaginationType, PaginationParamType } from "../../types/pagination.type";
import { PostEntityDB, PostEntityResponse } from "../../types/posts.type";

export const postsQueryRepository = {
  getPosts: async (data: PaginationParamType): Promise<OutputPaginationType> => {
    const result: PostEntityDB[] = await postsCollection
      .find(data.filter ?? {})
      .sort({ [data.sortBy]: data.sortDirection as 1 | -1 })
      .skip(data.skipCount!)
      .limit(data.pageSize)
      .toArray();
    const countDocuments: number = await postsCollection.countDocuments(data?.filter);
    const pagesCount: number = Math.ceil(countDocuments / data.pageSize);
    return {
      pagesCount,
      page: data.pageNumber,
      pageSize: data.pageSize,
      totalCount: countDocuments,
      items: result.map(mappging),
    };
  },
  findOneById: async (id: string): Promise<PostEntityResponse | null> => {
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });
    if (post) {
      return mappging(post);
    }
    return null;
  },
};

const mappging = (post: PostEntityDB): PostEntityResponse => {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
};
