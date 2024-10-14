import express from "express";
import { blogsRouter } from "./routes/blogs.route";
import { postsRouter } from "./routes/posts.routes";
import { testsRouter } from "./routes/tests.route";

export const app = express();

app.use(express.json());
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/testing", testsRouter)