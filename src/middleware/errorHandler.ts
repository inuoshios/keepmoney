import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let CustomError = {
        statusCode: res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message
    }

}