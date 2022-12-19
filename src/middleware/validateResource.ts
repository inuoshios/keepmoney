import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: Function) => {
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
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: (e as Error).message });
    }
  };
