import { Collection } from "mongodb";
import { dbConnection } from "./db";
import { outputBlogType } from "../types/blogs.type";
import { outputPostType } from "../types/posts.type";

export const blogsCollection: Collection<outputBlogType> = dbConnection.collection<outputBlogType>("blogs")
export const postsCollection: Collection<outputPostType> = dbConnection.collection<outputPostType>("posts")