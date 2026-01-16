import express from "express";
import { commentController } from "./comment.controller";
import auth, { UserRole } from "../../middleware/auth";
const router = express.Router();
router.get("/:commendID", commentController.getCommentById);
router.post("/", auth(UserRole.USER, UserRole.ADMIN), commentController.createComment);
export const CommentRouter = router;
//# sourceMappingURL=comment.routes.js.map