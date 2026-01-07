import express, { Application } from "express";
import { PostRouter } from "./modules/post/post.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
const app: Application = express()

app.all('/api/auth/*splat', toNodeHandler(auth)); //Note -> *splat dite hobe

app.use(express.json())

app.use("/posts", PostRouter)

app.get("/", (req, res) => {
    res.send("Blog App Running on PORT:3000")
})


export default app;