import { ObjectId } from "mongodb"

export type inputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,

}

export type outputPostType = {
    id: string
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date,
}