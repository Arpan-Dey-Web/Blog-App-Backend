import { CommentStatus, Post, PostStatus } from "../../../generated/prisma/client";
export declare const postService: {
    createPost: (data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">, userId: string) => Promise<{
        tags: string[];
        isFeatured: boolean;
        status: PostStatus;
        authorId: string;
        id: string;
        title: string;
        content: string;
        thumbnail: string | null;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllPost: ({ search, tags, isFeatured, status, authorId, page, limit, skip, sortOrder, sortBy }: {
        search: string;
        tags: string[];
        isFeatured: boolean | undefined;
        status: PostStatus | undefined;
        authorId: string | undefined;
        page: number;
        limit: number;
        skip: number;
        sortOrder: string;
        sortBy: string;
    }) => Promise<{
        data: ({
            _count: {
                comments: number;
            };
        } & {
            tags: string[];
            isFeatured: boolean;
            status: PostStatus;
            authorId: string;
            id: string;
            title: string;
            content: string;
            thumbnail: string | null;
            viewCount: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getPostById: (postId: string) => Promise<({
        comments: ({
            replies: ({
                replies: {
                    status: CommentStatus;
                    authorId: string;
                    id: string;
                    content: string;
                    createdAt: Date;
                    updatedAt: Date;
                    postId: string;
                    parentId: string | null;
                }[];
            } & {
                status: CommentStatus;
                authorId: string;
                id: string;
                content: string;
                createdAt: Date;
                updatedAt: Date;
                postId: string;
                parentId: string | null;
            })[];
        } & {
            status: CommentStatus;
            authorId: string;
            id: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
            postId: string;
            parentId: string | null;
        })[];
        _count: {
            comments: number;
        };
    } & {
        tags: string[];
        isFeatured: boolean;
        status: PostStatus;
        authorId: string;
        id: string;
        title: string;
        content: string;
        thumbnail: string | null;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
};
//# sourceMappingURL=post.service.d.ts.map