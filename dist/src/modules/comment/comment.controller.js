import { ComementService } from "./comment.service";
const createComment = async (req, res, next) => {
    try {
        const user = req.user;
        req.body.authorId = user?.id;
        const result = await ComementService.createComment(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({
            error: "Comment creation Failed",
            details: error
        });
    }
};
const getCommentById = async (req, res, next) => {
    try {
        const { commendID } = req.params;
        const result = await ComementService.getCommentById(commendID);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({
            error: "Comment creation Failed",
            details: error
        });
    }
};
export const commentController = {
    createComment,
    getCommentById
};
//# sourceMappingURL=comment.controller.js.map