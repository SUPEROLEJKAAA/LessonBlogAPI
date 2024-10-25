import { Collection } from "mongodb";
import { dbConnection } from "./db";
import { BlogEntityDB } from "../types/blogs.type";
import { PostEntityDB } from "../types/posts.type";
import { UserEntityDB } from "../types/users.type";

export const blogsCollection: Collection<BlogEntityDB> = dbConnection.collection<BlogEntityDB>("blogs");
export const postsCollection: Collection<PostEntityDB> = dbConnection.collection<PostEntityDB>("posts");
export const usersCollection: Collection<UserEntityDB> = dbConnection.collection<UserEntityDB>("users");
