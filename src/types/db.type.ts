import { outputBlogType } from "./blogs.type"
import { outputPostType } from "./posts.type"

export interface dbType {
    blogs: outputBlogType[],
    posts: outputPostType[]
}