import { Request, Response } from "express";
export declare const postController: {
    createPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getPostById: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=post.controller.d.ts.map