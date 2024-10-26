import { Filter } from "mongodb";
import { BlogEntityResponse } from "./blogs.type";
import { PostEntityResponse } from "./posts.type";
import { UserEntityResponse } from "./users.type";

export type PaginationParamType = {
  searchNameTerm?: string;
  searchLoginTerm?: string;
  searchEmailTerm?: string;
  sortBy: string;
  sortDirection: string | number;
  pageNumber: number;
  pageSize: number;
  skipCount?: number;
  blogId?: string;
  filter?: Filter<any>;
};

export type PaginationTarget = "blogs" | "posts" | "users";

export type PaginationDefaultParamType = {
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
};

export type OutputPaginationType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogEntityResponse[] | PostEntityResponse[] | UserEntityResponse[];
};