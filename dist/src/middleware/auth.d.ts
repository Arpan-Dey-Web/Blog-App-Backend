import express, { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerified: Boolean;
            };
        }
    }
}
export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
declare const auth: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
export default auth;
//# sourceMappingURL=auth.d.ts.map