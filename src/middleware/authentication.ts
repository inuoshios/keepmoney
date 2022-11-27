import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { getSingleUser } from '../services/user.services';
import { generateToken, verifyToken } from '../utils/jwt';

export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken }: { accessToken: string, refreshToken: string } = req.cookies;

    if (!accessToken) {
        throw new Error('unauthorized to access this resource');
    }

    try {
        const payload = verifyToken(accessToken) as JwtPayload;

        // @ts-ignore
        req.user = payload.id;
        next();
    } catch (e) {
        throw new Error((e as Error).message);
    }

}