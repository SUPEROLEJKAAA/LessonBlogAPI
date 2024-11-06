import { ObjectId } from "mongodb";
import { usersCollection } from "../../db/collections";
import { UserEntityDB, UserEntityResponse } from "../../types/users.type";
import { OutputPaginationType, PaginationParamType } from "../../types/pagination.type";
import { apiError } from "../../middlewares/errors.middliware";

export const usersQueryRepository = {
  getUsers: async (data: PaginationParamType): Promise<OutputPaginationType> => {
    const result: UserEntityDB[] = await usersCollection
      .find(data.filter ?? {})
      .sort({ [data.sortBy]: data.sortDirection as 1 | -1 })
      .skip(data.skipCount!)
      .limit(data.pageSize)
      .toArray();
    const countDocuments: number = await usersCollection.countDocuments(data.filter ?? {});
    const pagesCount: number = Math.ceil(countDocuments / data.pageSize);
    return {
      pagesCount,
      page: data.pageNumber,
      pageSize: data.pageSize,
      totalCount: countDocuments,
      items: result.map(mapping),
    };
  },
  findOneById: async (id: string): Promise<UserEntityResponse> => {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (user) {
      return mapping(user);
    }
    throw new apiError("Not found", 404);
  },
};

const mapping = (user: UserEntityDB): UserEntityResponse => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};
