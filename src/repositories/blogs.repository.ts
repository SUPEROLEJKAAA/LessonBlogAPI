import { db } from "../db/db";
import { inputBlogType, outputBlogType } from "../types/blogs.type";
import { v4 as uuid } from "uuid";

export const blogsReposity = {
  all: (): outputBlogType[] => {
    return db.blogs;
  },
  create: (data: inputBlogType): outputBlogType => {
    const newPost = {
      id: uuid(),
      ...data,
    };
    db.blogs.push(newPost);
    return newPost;
  },
  findOneById: (id: string): outputBlogType | undefined => {
    const blog = db.blogs.find((b) => b.id === id);
    return blog;
  },
  findIndexById: (id: string): number => {
    return db.blogs.findIndex((b) => b.id === id)
  },
  updateById: (index: number, data: inputBlogType): void => {
    const updatedBlog: outputBlogType = { ...db.blogs[index], ...data };
    db.blogs[index] = updatedBlog;
  },
  delete: (index: number): void => {
    db.blogs.splice(index, 1)
  }
};
