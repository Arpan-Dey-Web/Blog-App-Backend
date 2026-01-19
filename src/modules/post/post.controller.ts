import { NextFunction, Request, Response } from "express"
import { postService } from "./post.service"
import { PostStatus } from "../../../generated/prisma/enums";
import paginationHelper from "../../helper/paginationHelper";
import { UserRole } from "../../middleware/auth";
import { error } from "node:console";



const getAllPost = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;

        const tags = req.query.tags ? (req.query.tags as string).split(",") : []

        const searchString = typeof search === "string" ? search : ""

        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" ? true : req.query.isFeatured === "false" ? false : undefined : undefined

        const status = req.query.status as PostStatus | undefined

        const authorId = req.query.authorId as string | undefined

        const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query)

        const getallresult = await postService.getAllPost({ search: searchString, tags, isFeatured, status, authorId, page, limit, skip, sortBy, sortOrder })

        return res.send(getallresult)

    } catch (error) {

        console.log(error);
    }
}

const getPostById = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params
        if (!postId) {
            throw new Error("post id is required ")
        }

        const result = await postService.getPostById(postId)
        res.status(200).json(result)


    } catch (error) {
        res.status(400).json({
            error: "Post creation failed",
            details: error
        })
    }
}

const createPost = async (req: Request, res: Response, next:NextFunction) => {

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
       next(error)
    } 
}

const getMyPost = async (req: Request, res: Response) => {
    try {
        const user = req?.user;
        console.log(user);
        if (!user) {
            throw new Error('Unauthorized')
        }
        const result = await postService.getMyPost(user.id as string)
        res.status(200).json(result)

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Post fetched failed",
            details: error
        })
    }
}

const updateMyPost = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const user = req?.user;
        console.log(user);
        if (!user) {
            throw new Error('Unauthorized')
        }
        const { postid } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        console.log(user );
        const result = await postService.updateMyPost(postid as string, req.body, user?.id, isAdmin)
        res.status(200).json(result)

    } catch (e) {
        next(e)
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        const user = req?.user;
        console.log(user);
        if (!user) {
            throw new Error('Unauthorized')
        }
        const { postid } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        console.log(user);
        const result = await postService.deletePost(postid as string, user?.id, isAdmin)
        res.status(200).json(result)

    } catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Post  delete Failed"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
}

const getStats = async (req: Request, res: Response) => {
    try {
        const result = await postService.getStats()
        res.status(200).json(result)

    } catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "stats  fetched Failed"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
}






export const postController = {
    createPost,
    getAllPost,
    getPostById,
    getMyPost,
    updateMyPost,
    deletePost,
    getStats
}