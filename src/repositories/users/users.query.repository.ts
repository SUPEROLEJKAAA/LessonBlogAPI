import { ObjectId } from "mongodb";
import { usersCollection } from "../../db/collections";
import { UserEntityDB, UserEntityResponse } from "../../types/users.type";
import { OutputPaginationType, PaginationParamType } from "../../types/pagination.type";

export const usersQueryRepository = {
  getUsers: async (data: PaginationParamType): Promise<OutputPaginationType> => {
    console.log(JSON.stringify(data.filter));
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
      items: result.map(mappging),
    };
  },
  findOneById: async (id: string): Promise<UserEntityResponse | null> => {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (user) {
      return mappging(user);
    }
    return null;
  },
};

const mappging = (user: UserEntityDB): UserEntityResponse => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};
