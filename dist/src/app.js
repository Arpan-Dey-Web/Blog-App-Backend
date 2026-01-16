import express from "express";
import { PostRouter } from "./modules/post/post.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { CommentRouter } from "./modules/comment/comment.routes";
const app = express();
// ts node dev
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true
}));
app.all('/api/auth/*splat', toNodeHandler(auth)); //Note -> *splat dite hobe
app.use(express.json());
// post routes
app.use("/posts", PostRouter);
// comment routes
app.use("/comments", CommentRouter);
app.get("/", (req, res) => {
    res.send("Blog App Running on PORT:3000");
});
export default app;
//# sourceMappingURL=app.js.map