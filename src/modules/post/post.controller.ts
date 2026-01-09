import { Request, Response } from "express"
import { postService } from "./post.service"




const getAllPost = async (req: Request, res: Response) => {
    try {
        const getallresult = await postService.getAllPost()
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