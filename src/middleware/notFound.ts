import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "this route does not exist",
    });
};