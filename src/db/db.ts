import { outputBlogType } from "../types/blogs.type"
import { dbType } from "../types/db.type"
import { outputPostType } from "../types/posts.type"

export const db: dbType = {
    blogs: [],
    posts: []
}

export const clear = () => {
    db.blogs = []
    db.posts = []
}