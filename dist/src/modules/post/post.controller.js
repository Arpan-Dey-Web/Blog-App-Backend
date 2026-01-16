import { postService } from "./post.service";
import paginationHelper from "../../helper/paginationHelper";
const getAllPost = async (req, res) => {
    try {
        const { search } = req.query;
        const tags = req.query.tags ? req.query.tags.split(",") : [];
        const searchString = typeof search === "string" ? search : "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" ? true : req.query.isFeatured === "false" ? false : undefined : undefined;
        const status = req.query.status;
        const authorId = req.query.authorId;
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query);
        const getallresult = await postService.getAllPost({ search: searchString, tags, isFeatured, status, authorId, page, limit, skip, sortBy, sortOrder });
        return res.send(getallresult);
    }
    catch (error) {
        console.log(error);
    }
};
const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            throw new Error("post id is required ");
        }
        const result = await postService.getPostById(postId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({
            error: "Post creation failed",
            details: error
        });
    }
};
const createPost = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized",
            });
        }
        const result = await postService.createPost(req.body, user.id);
        return res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "post creation failed",
        });
    }
};
export const postController = {
    createPost,
    getAllPost,
    getPostById
};
//# sourceMappingURL=post.controller.js.map