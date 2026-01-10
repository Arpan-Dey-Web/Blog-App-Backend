import { Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


const getAllPost = async ({ search, tags, isFeatured, status, authorId, page, limit, skip  }: {
    search: string,
    tags: string[],
    isFeatured: boolean | undefined
    status: PostStatus | undefined,
    authorId: string | undefined,
    page: number,
    limit: number,
    skip : number
}) => {

    const andConditions: PostWhereInput[] = [];
    if (search) {
        andConditions.push({
            // or diye jekono ekta mille return korbe
            OR: [
                //title search
                {
                    title: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
                //content search 
                {
                    content: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
                {
                    // tag diye search korbe
                    tags: {
                        // ache kina check korbe
                        has: search as string
                    }
                }
            ],
        })
    }

    if (tags.length > 0) {
        andConditions.push({ // tag diye search 
            tags: {
                hasEvery: tags as string[]
            }
        })
    }

    if (typeof isFeatured === "boolean") {
        andConditions.push({ isFeatured })
    }

    if (status) {
        andConditions.push({ status })
    }

    if (authorId) {
        andConditions.push({authorId})
    }

    const allPost = await prisma.post.findMany({
        // kotai ache seta kuje ber korbe
        take: limit,
        skip,
        where: {
             AND: andConditions
        }

    }) 
    return allPost;
}





const createPost = async (data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...data,
            authorId: userId
        }
    })

    return result
}


export const postService = {
    createPost,
    getAllPost
}