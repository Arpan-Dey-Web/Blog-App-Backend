type payloadType = {
    content: string;
    authorId: string;
    postId: string;
    parentId?: string;
};
export declare const ComementService: {
    createComment: (payload: payloadType) => Promise<{
        id: string;
        content: string;
        authorId: string;
        status: import("../../../generated/prisma/enums").CommentStatus;
        createdAt: Date;
        updatedAt: Date;
        postId: string;
        parentId: string | null;
    }>;
    getCommentById: (commendID: string) => Promise<void>;
};
export {};
//# sourceMappingURL=comment.service.d.ts.map