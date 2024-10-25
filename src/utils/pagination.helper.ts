import { PaginationDefaultParamType, PaginationParamType, PaginationTarget } from "../types/pagination.type";

function getUnionParams(data: PaginationParamType, type: PaginationTarget): PaginationParamType {
  const defaultParams: PaginationDefaultParamType = {
    sortBy: "createdAt",
    sortDirection: "desc",
    pageNumber: 1,
    pageSize: 10,
  };
  const params: PaginationParamType = { ...defaultParams, ...data };
  const filters = {
    blogs: params.searchNameTerm ? { name: { $regex: params.searchNameTerm, $options: "i" } } : {},
    posts: params.blogId ? { blogId: { $eq: params.blogId } } : {},
    users:
      params.searchLoginTerm || params.searchEmailTerm
        ? {
            $or: [
              { login: { $regex: params.searchLoginTerm ?? "", $options: "i" } },
              { email: { $regex: params.searchEmailTerm ?? "", $options: "i" } },
            ],
          }
        : {},
  };
  return {
    ...params,
    filter: filters[type],
  };
}

export const paginationHelper = {
  mapping: (data: PaginationParamType, type: PaginationTarget): PaginationParamType => {
    const params = getUnionParams(data, type);
    const typeSort: number = params.sortDirection === "desc" ? -1 : 1;
    const skipCount: number = (params.pageNumber - 1) * params.pageSize;
    return { ...params, sortDirection: typeSort, skipCount };
  },
};
