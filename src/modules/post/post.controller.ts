import { Request, Response } from "express"
import { postService } from "./post.service"
import { PostStatus } from "../../../generated/prisma/enums";




const getAllPost = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;

        const tags = req.query.tags ? (req.query.tags as string).split(",") : []

        const searchString = typeof search === "string" ? search : ""

        const isFeatured = req.query.isFeatured ?
            req.query.isFeatured === "true" ?
                true :
                req.query.isFeatured === "false" ? false : undefined : undefined

        const status = req.query.status as PostStatus | undefined

        const authorId = req.query.authorId as string | undefined

        const page = Number(req.query.page ?? 1)
        const limit = Number(req.query.limit ?? 10)
        const skip = (page - 1) * limit

        const getallresult = await postService.getAllPost({ search: searchString, tags, isFeatured, status, authorId, page, limit, skip })

        return res.send(getallresult)
    } catch (error) {
        console.log(error);
    }
}



const createPost = async (req: Request, res: Response) => {

    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized",
            })
        }
        const result = await postService.createPost(req.body, user.id as string)
        return res.status(201).json(result)
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "post creation failed",
        })
    }
}



export const postController = {
    createPost,
    getAllPost,
}