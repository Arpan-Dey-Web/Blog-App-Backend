import { prisma } from "../../lib/prisma";

type payloadType = {
    content: string,
    authorId: string,
    postId: string,
    parentId?: string,
}

const createComment = async (payload: payloadType) => {
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })


    if (payload.parentId) {
        await prisma.comment.findUniqueOrThrow({
            where: {
                id: payload.parentId
            }
        })
    }
    return await prisma.comment.create({
        data: payload
    })
}

export const ComementService = {
    createComment,
}