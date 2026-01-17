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


const getCommentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { commendID } = req.params;
        const result = await ComementService.getCommentById(commendID as string)
        res.status(201).json(result)

    } catch (error) {
        res.status(400).json({
            error: "Comment creation Failed",
            details: error
        })
    }


}


const getCommentsByAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorId } = req.params;
        const result = await ComementService.getCommentsByAuthor(authorId as string)
        res.status(201).json(result)

    } catch (error) {
        res.status(400).json({
            error: "Author id get Failed",
            details: error
        })
    }


}


const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const { commentId } = req.params;
        const result = await ComementService.deleteComment(commentId as string, user?.id as string)
        res.status(201).json(result)

    } catch (error) {
        res.status(400).json({
            error: "Comment  Delete Failed",
            details: error
        })
    }


}


const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        const { commentId } = req.params;
        const result = await ComementService.updateComment(commentId as string, req.body, user?.id as string)
        res.status(201).json(result)

    } catch (error) {
        res.status(400).json({
            error: "Comment  update Failed",
            details: error
        })
    }


}

const moderateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { commentId } = req.params;
        const result = await ComementService.moderateComment(commentId as string , req.body)
        res.status(201).json(result)

    } catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Comment  update Failed"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }


}






export const commentController = {
    createComment,
    getCommentById,
    getCommentsByAuthor,
    deleteComment,
    updateComment,
    moderateComment
}