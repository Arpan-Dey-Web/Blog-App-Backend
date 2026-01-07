import { Request, Response } from "express"
import { postService } from "./post.service"



const createPost = async (req: Request, res: Response) => {
    try {
        const result = await postService.createPost(req.body)
        res.send(201).json(result)
    } catch (error) {
        console.log(error);
        res.send(404).json({ error: "post creation failed" })
    }
}


const getAllPost = async (req: Request, res: Response) => {
    try {
        const getallresult = "fd" //await postService
    } catch (error) {
        console.log(error);
    }
}


export const postController = {
    createPost, getAllPost
}