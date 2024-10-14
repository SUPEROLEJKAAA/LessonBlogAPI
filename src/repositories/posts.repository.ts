import { db } from "../db/db";
import { v4 as uuid } from "uuid";
import { inputPostType, outputPostType } from "../types/posts.type";
import { blogsReposity } from "./blogs.repository";
import { outputBlogType } from "../types/blogs.type";

export const postsRepository = {
  all: (): outputPostType[] => {
    return db.posts;
  },
  create: (data: inputPostType): outputPostType => {
    const blog: outputBlogType | undefined = blogsReposity.findOneById(
      data.blogId
    );
    const newPost: outputPostType = {
      id: uuid(),
      ...data,
      blogName: blog?.name as any,
    };
    db.posts.push(newPost)
    return newPost;
  },
  findOneById: (id: string): outputPostType | undefined => {
    return db.posts.find((p) => p.id === id);
  },
  findOneByIndex: (id: string): number => {
    return db.posts.findIndex((p) => p.id === id);
  },
  updateOneById: (index: number, data: inputPostType): void => {
    const post: inputPostType = db.posts[index]
    const blog: outputBlogType | undefined = blogsReposity.findOneById(
      data.blogId
    );
    const newPost: outputPostType = { ...post, ...data, ...(blog?.name as any) };
    db.posts[index] = newPost;
  },
  delete: (index: number): void => {
    db.posts.splice(index, 1)
  }
};
