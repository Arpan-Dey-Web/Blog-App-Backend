import { Request, Response } from "express";

export function notFound(req: Request, res: Response) {

    res.json(404).json({
        message: "route not found",
        path: req.originalUrl,
        date: Date()
    })

}
