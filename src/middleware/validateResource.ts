import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: Function) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: e.flatten() });
        }
        return res.status(StatusCodes.BAD_REQUEST).json({ error: (e as Error).message });
    }
};