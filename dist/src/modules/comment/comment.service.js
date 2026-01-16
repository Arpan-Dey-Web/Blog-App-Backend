import { prisma } from "../../lib/prisma";
const createComment = async (payload) => {
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    });
    if (payload.parentId) {
        await prisma.comment.findUniqueOrThrow({
            where: {
                id: payload.parentId
            }
        });
    }
    return await prisma.comment.create({
        data: payload
    });
};
const getCommentById = async (commendID) => {
    console.log("this is  CommentID", commendID);
    console.log("object");
    console.log("hello server");
};
export const ComementService = {
    createComment,
    getCommentById
};
//# sourceMappingURL=comment.service.js.map