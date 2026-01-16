import { CommentStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
const getAllPost = async ({ search, tags, isFeatured, status, authorId, page, limit, skip, sortOrder, sortBy }) => {
    const andConditions = [];
    if (search) {
        andConditions.push({
            // or diye jekono ekta mille return korbe
            OR: [
                //title search
                {
                    title: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                //content search 
                {
                    content: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    // tag diye search korbe
                    tags: {
                        // ache kina check korbe
                        has: search
                    }
                }
            ],
        });
    }
    if (tags.length > 0) {
        andConditions.push({
            tags: {
                hasEvery: tags
            }
        });
    }
    if (typeof isFeatured === "boolean") {
        andConditions.push({ isFeatured });
    }
    if (status) {
        andConditions.push({ status });
    }
    if (authorId) {
        andConditions.push({ authorId });
    }
    const allPost = await prisma.post.findMany({
        // kotai ache seta kuje ber korbe
        take: limit,
        skip,
        where: {
            AND: andConditions
        },
        orderBy: {
            [sortBy]: sortOrder
        }, include: {
            _count: {
                select: {
                    comments: true
                }
            }
        }
    });
    const total = await prisma.post.count({
        where: {
            AND: andConditions
        },
    });
    return {
        data: allPost,
        pagination: {
            total, page, limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};
const getPostById = async (postId) => {
    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: {
                id: postId
            },
            data: {
                viewCount: {
                    increment: 1
                }
            }
        });
        const postData = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                comments: {
                    where: {
                        parentId: null,
                        status: CommentStatus.APPROVED
                    },
                    orderBy: { createdAt: "asc" }, // asc or desc
                    include: {
                        replies: {
                            where: {
                                status: CommentStatus.APPROVED
                            },
                            orderBy: { createdAt: "asc" }, // asc or desc
                            include: {
                                replies: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        });
        return postData;
    });
};
const createPost = async (data, userId) => {
    const result = await prisma.post.create({
        data: {
            ...data,
            authorId: userId
        }
    });
    return result;
};
export const postService = {
    createPost,
    getAllPost,
    getPostById
};
//# sourceMappingURL=post.service.js.map