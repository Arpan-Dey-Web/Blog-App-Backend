import express, { Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/", postController.getAllPost)

router.get("/myPosts", auth(UserRole.ADMIN, UserRole.USER), postController.getMyPost)

router.get("/:postId", postController.getPostById)

router.post("/", auth(UserRole.USER, UserRole.ADMIN), postController.createPost)

router.patch("/:postid", auth(UserRole.ADMIN, UserRole.USER), postController.updateMyPost)


export const PostRouter: Router = router;