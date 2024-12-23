import express, { Response, Request, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { blogsRouter } from "./routes/blogs.routes";
import { postsRouter } from "./routes/posts.routes";
import { testsRouter } from "./routes/tests.routes";
import { usersRouter } from "./routes/users.routes";
import { authRouter } from "./routes/auth.routes";
import { commentsRouter } from "./routes/comments.routes";
import { errorHander } from "./middlewares/errors.middliware";
import { devicesRouter } from "./routes/devices.routes";

export const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("--------------");
  console.log(`${req.method} | ${req.url}`);
  console.log("Body:", req.body);
  next();
});
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/comments", commentsRouter);
app.use("/security", devicesRouter);
app.use("/testing", testsRouter);
app.use(errorHander);
