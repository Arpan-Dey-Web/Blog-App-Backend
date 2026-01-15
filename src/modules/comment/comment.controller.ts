import { NextFunction, Request, Response } from "express";
import { ComementService } from "./comment.service";




const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        req.body.authorId = user?.id;
        const result = await ComementService.createComment(req.body)
        res.status(201).json(result)

    } catch (error) {
        res.status(400).json({
            error: "Comment creation Failed",
            details: error
        })
    }


}

export const commentController = {
    createComment
}