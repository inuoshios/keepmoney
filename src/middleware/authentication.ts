import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt';

export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string = req.headers.authorization!;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Error("authentication failed, no auth header provided");
    }

    const token: string[] = authHeader.split(' ');

    try {
        const payload = verifyToken(token[1]) as JwtPayload;

        res.locals.user = payload;

        next();
    } catch (e) {
        throw new Error((e as Error).message);
    }
};