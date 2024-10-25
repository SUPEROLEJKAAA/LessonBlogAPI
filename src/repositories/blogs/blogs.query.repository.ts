import { ObjectId } from "mongodb";
import { blogsCollection } from "../../db/collections";
import { BlogEntityResponse, BlogEntityDB } from "../../types/blogs.type";
import { OutputPaginationType, PaginationParamType } from "../../types/pagination.type";

export const blogsQueryRepository = {
  getBlogs: async (data: PaginationParamType): Promise<OutputPaginationType> => {
    const result: BlogEntityDB[] = await blogsCollection
      .find(data.filter ?? {})
      .sort({ [data.sortBy]: data.sortDirection as 1 | -1 })
      .skip(data.skipCount!)
      .limit(data.pageSize)
      .toArray();
    const countDocuments: number = await blogsCollection.countDocuments(data.filter ?? {});
    const pagesCount: number = Math.ceil(countDocuments / data.pageSize);
    return {
      pagesCount,
      page: data.pageNumber,
      pageSize: data.pageSize,
      totalCount: countDocuments,
      items: result.map(mappging) as BlogEntityResponse[],
    };
  },
  findOneById: async (id: string): Promise<BlogEntityResponse | null> => {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (blog) {
      return mappging(blog) as BlogEntityResponse;
    }
    return null;
  },
};

const mappging = (blog: BlogEntityDB): BlogEntityResponse => {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
};
