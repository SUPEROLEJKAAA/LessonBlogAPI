import { query, ValidationChain } from "express-validator";

const availableSortBy: { blogs: string[]; posts: string[]; users: string[] } = {
  blogs: ["id", "name", "description", "websiteUrl", "createdAt", "isMembership"],
  posts: ["id", "title", "shortDescription", "content", "blogId", "blogName", "createdAt"],
  users: ["id", "login", "email", "createdAt"],
};
const availableSortDirection: string[] = ["asc", "desc"];

export const paginationValidator: {
  blogs: ValidationChain[];
  posts: ValidationChain[];
  users: ValidationChain[];
} = {
  blogs: [
    query("searchNameTerm").trim().optional().isString(),
    query("sortBy").trim().optional().isIn(availableSortBy.blogs),
    query("sortDirection").trim().optional().isIn(availableSortDirection),
    query("pageNumber").trim().optional().toInt().isInt(),
    query("pageSize").trim().optional().toInt().isInt(),
  ],
  posts: [
    query("sortBy").trim().optional().isIn(availableSortBy.posts),
    query("sortDirection").trim().optional().isIn(availableSortDirection),
    query("pageNumber").trim().optional().toInt().isInt(),
    query("pageSize").trim().optional().toInt().isInt(),
  ],
  users: [
    query("sortBy").trim().optional().isIn(availableSortBy.users),
    query("sortDirection").trim().optional().isIn(availableSortDirection),
    query("pageNumber").trim().optional().toInt().isInt(),
    query("pageSize").trim().optional().toInt().isInt(),
    query("searchLoginTerm").trim().optional().isString(),
    query("searchEmailTerm").trim().optional().isString(),
  ],
};
