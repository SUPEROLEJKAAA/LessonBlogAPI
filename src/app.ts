import express, { Response, Request, NextFunction } from "express";
import { blogsRouter } from "./routes/blogs.route";
import { postsRouter } from "./routes/posts.routes";
import { testsRouter } from "./routes/tests.route";
import { usersRouter } from "./routes/users.route";
import { authRouter } from "./routes/auth.routes";

export const app = express();

app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("--------------")
    console.log(`${req.method} | ${req.url}`);
    console.log('Body:', req.body); // Если body-парсер используется
  
    next(); // Передаем управление следующему middleware
  });
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter)
app.use("/testing", testsRouter);
