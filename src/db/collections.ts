import { Collection } from "mongodb";
import { dbConnection } from "./db";
import { BlogEntityDB } from "../types/blogs.type";
import { PostEntityDB } from "../types/posts.type";
import { UserEntityDB } from "../types/users.type";
import { CommentEntityDB } from "../types/comments.type";
import { TokenEntityDB } from "../types/tokens.type";

export const blogsCollection: Collection<BlogEntityDB> = dbConnection.collection<BlogEntityDB>("blogs");
export const postsCollection: Collection<PostEntityDB> = dbConnection.collection<PostEntityDB>("posts");
export const usersCollection: Collection<UserEntityDB> = dbConnection.collection<UserEntityDB>("users");
export const commentsCollection: Collection<CommentEntityDB> = dbConnection.collection<CommentEntityDB>("comments");
export const tokensCollection: Collection<TokenEntityDB> = dbConnection.collection<TokenEntityDB>("tokens");
