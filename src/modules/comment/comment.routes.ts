import express, { Router } from "express";
import { commentController } from "./comment.controller";
import auth, { UserRole } from "../../middleware/auth";
const router = express.Router();

// get comments by id 
router.get("/:commendID", commentController.getCommentById)

// get comment by authorid
router.get("/author/:authorId", commentController.getCommentsByAuthor)

router.post("/", auth(UserRole.USER, UserRole.ADMIN), commentController.createComment)

router.delete("/:commentId", auth(UserRole.USER, UserRole.ADMIN), commentController.deleteComment)



export const CommentRouter: Router = router;  